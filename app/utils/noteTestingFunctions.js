import { Map, List, fromJS, Iterable, toJS, toKeyedSeq } from 'immutable'
import { notes, context } from 'config/constants'

export function counterIncrement(targetNote, counter) {
    return counter.map
}

//Redux
//take counter array and return a random targetNote if it hasn't been played 5 times.
export function randomNotes(tracker) {
    const availableNotes = List();

    //going to have to convert it to a map/list? Don't think so.
    const randomNotes = tracker.map((item) => {
        if (item.get('count') < 1) {
            return availableNotes.push(item)
        }
    });

    return randomNotes.size > 0 ? randomNotes.get(Math.floor(randomNotes.size * Math.random())) : ''
}

function loadSoundRequest(note, obj) {

    return new Promise((resolve, reject) => {
        const { src } = obj
        var request = new XMLHttpRequest();
        request.open('GET', src, true);
        request.responseType = 'arraybuffer';

        request.onload = function () {

            context.decodeAudioData(request.response)
                .then((buffer)=> {
                        obj.buffer = buffer
                        resolve({note, obj})
                    }
                )
        }
        request.send();
    })
}

export function loadNotes() {

    const promises = [];

    for (var note in notes) {
        if (notes.hasOwnProperty(note)) {
            // load sound
            promises.push(loadSoundRequest(note, notes[note]))
        }
    }

    return Promise.all(promises)
        .then((data) => {
            data.map((item) => {
                    notes[item.note] = item.obj
                }
            )
            return notes
        })
        .catch((err) => Error('Promise.all error:', err));
}

export async function handleIncorrect({ note, time, volume, randomMaskingNotes }) {
    try {
        const playNote = await playNotes({ note, time, volume })
        const noise = await makeNoise({ time: 1000 } )
        //const array = randomMaskingNotes.toJS()
        return await Promise.all(randomMaskingNotes.map((value) => playNotes({ note: value, time: 2000, volume: 0.5 })))

    } catch (error) {
        console.log('error in async function handleIncorrect', error)
    }
}

//this is the api call:
function playNotes({ note, time = 1000, volume = 1 }) {
    console.log(note)
    return new Promise((resolve, reject) => {
        const source = context.createBufferSource();
        source.buffer = notes[note].buffer
        //code for the volume
        notes[note].gainNode = context.createGain()
        source.connect(notes[note].gainNode)
        notes[note].volume = volume
        notes[note].gainNode.gain.value = notes[note].volume
        notes[note].gainNode.connect(context.destination)

        //yield before here?
        source.start(0)
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
        gain.gain.value = volume;
        node.connect(gain);
        gain.connect(context.destination);

        node.loop = true;
        node.start(0)
        setTimeout(()=> {
            resolve(node.stop())
        }, time)
    })
}

