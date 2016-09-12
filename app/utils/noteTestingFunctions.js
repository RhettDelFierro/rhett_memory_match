import { Map, List, fromJS, Iterable, toJS, toKeyedSeq } from 'immutable'
import { notes, context } from 'config/constants'

let newNotes = notes;

//Redux
//take counter array and return a random targetNote if it hasn't been played 5 times.
export function randomNotes({ tracker, mode, round }) {

    let instrument = 'piano'
    let octave = 'four'
    let count = 5;
    let availableNotes = List();

    if (mode === 'posttest' && round === 2) {
        count = 1;
        return filterList({tracker, count: count})
    } else if(mode === 'posttest' && round === 1) {
        count = 4
    }
    availableNotes = tracker.filter((item) => item.getIn([instrument, octave]) < count)
    //maybe an object/map also stating the instrument and octave
    //in this case piano and four. Unless you plan to have separate Redux stores.
    return availableNotes.size > 0
        ? Map({
        name: availableNotes.get(Math.floor(availableNotes.size * Math.random())).get('name'),
        instrument: 'piano',
        octave: 'four'
    })
        : ''
}

//want to replace all the forEach's maybe break into different functions.
function filterList({ tracker, count }) {
    let availableNotes = List();
    tracker.forEach((note) => {
        note.forEach((obj) => {
            if (obj !== note.get('name')) {
                let instrument = (obj === note.get('piano')) ? 'piano' : 'guitar'
                let octaveValue = Map()
                obj.forEach((value) => {
                    if (value < count) {
                        octaveValue = octaveValue.set('name', note.get('name'))
                            .set('instrument', instrument)
                            .set('octave', obj.keyOf(value))
                        availableNotes = availableNotes.push(octaveValue)
                    }
                })
            }
        })
    })
    if (availableNotes.size > 0) {
        const element = availableNotes.get(Math.floor(availableNotes.size * Math.random()))
        return (
            Map({
                name: element.get('name'),
                instrument: element.get('instrument'),
                octave: element.get('octave')
            })
        )
    } else {
        return ''
    }
}

function loadSoundRequest(obj, name) {

    return new Promise((resolve, reject) => {
        const src = obj.get('src')

        var request = new XMLHttpRequest();
        request.open('GET', src, true);
        request.responseType = 'arraybuffer';

        request.onload = function () {

            context.decodeAudioData(request.response)
                .then((buffer)=> {
                        obj = obj.set('buffer', buffer)
                        //console.log(obj.get('buffer'))
                        resolve({name, obj})
                    }
                ).catch((error) => {
                console.log(error)
            })
        }
        request.send();
    })
}


export async function loadNotes() {
    const promises = []
    //send those into loadSoundRequest one at a time.
    newNotes.forEach((note) => {
        promises.push(loadSoundRequest(note.getIn(['piano', 'four']), note.get('name')))
    })

    //resolve the super promise
    return Promise.all(promises)
        .then((data) => {
            data.forEach((note) => {
                newNotes = newNotes.setIn([note.name, 'piano', 'four'], note.obj)
                console.log(newNotes)
            })
        })
        .catch((err) => Error('Promise.all error:', err));
}

export async function buffer({ randomMaskingNotes, maskingNotesVolume, noiseVolume, notesBuffer }) {
    try {
        const noise = await makeNoise({time: 1000, volume: noiseVolume})
        return await Promise.all(randomMaskingNotes.map((value) => playNotes({
            note: value,
            time: 2000,
            volume: maskingNotesVolume,
            notesBuffer
        }))).then((notes) => notes)

    } catch (error) {
        console.log('error in buffer', error)
    }
}

//this is the api call:
export async function playNotes({ note, instrument = 'piano', octave = 'four', time = 1000,
    volume = 1, notesBuffer, masking = true }) {

    const source = context.createBufferSource();

    let noteBuffer = await notesBuffer.get(note)[instrument][octave]
    source.buffer = noteBuffer

    //copy of the buffer for the note being played
    noteBuffer.gainNode = context.createGain()
    source.connect(noteBuffer.gainNode)
    noteBuffer.volume = volume
    noteBuffer.gainNode.gain.value = noteBuffer.volume
    noteBuffer.gainNode.connect(context.destination)

    //yield before here?
    source.start(0)

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(source.stop())
        }, time)
    })
}

//make for Redux
export function maskingNotes(tracker) {

    let newArray = List();

    for (let i = 0; i < 16; i++) {
        newArray = newArray.push(tracker.get(Math.floor(tracker.size * Math.random())).get('name'))
    }
    return newArray
}

//make adjustments to have volume control.
export function makeNoise({ time, volume = 0.010 }) {

    return new Promise((resolve, reject) => {
        var node = context.createBufferSource()
            , buffer = context.createBuffer(1, 4096, context.sampleRate)
            , data = buffer.getChannelData(0);

        for (var i = 0; i < 4096; i++) {
            data[i] = Math.random();
        }

        node.buffer = buffer;

        //volume- This works!
        var gain = context.createGain();
        gain.gain.value = volume * 0.10
        node.connect(gain);
        gain.connect(context.destination);

        node.loop = true;
        node.start(0)
        setTimeout(()=> {
            resolve(node.stop())
        }, time)
    })
}

