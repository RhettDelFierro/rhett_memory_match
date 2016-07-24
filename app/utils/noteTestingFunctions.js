import { Map, List, fromJS, Iterable, toJS, toKeyedSeq } from 'immutable'
import { notes, context } from 'config/constants'

export function counterIncrement(targetNote, counter) {
    return counter.map
}

//Redux
//take counter array and return a random targetNote if it hasn't been played 5 times.
export function randomNotes(tracker) {

    const availableNotes = tracker.filter((item) => item.get('count') < 5)

    return availableNotes.size > 0 ? availableNotes.get(Math.floor(availableNotes.size * Math.random())) : ''
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

export async function buffer({ randomMaskingNotes, maskingNotesVolume, noiseVolume }) {
    try {
        const noise = await makeNoise({time: 1000, volume: noiseVolume})
        return await Promise.all(randomMaskingNotes.map((value) => playNotes({
            note: value,
            time: 2000,
            volume: maskingNotesVolume
        })))

    } catch (error) {
        console.log('error in buffer', error)
    }
}

//this is the api call:
export function playNotes({ note, time = 1000, volume = 1 }) {

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

