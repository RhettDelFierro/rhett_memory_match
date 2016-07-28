import { OrderedMap, Map, fromJS, List, Record } from 'immutable'

function makeTrackerNote(name) {
    return {
        name: name,
        piano: {
            four: 0,
            five: 0
        },
        guitar: {
            three: 0,
            four: 0
        }
    }
}

export function makeTracker() {
    const notes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
    return notes.map((note) => {
        return makeTrackerNote(note)
    })
}

function loadSoundRequest(name, instrument, octave) {
    const octaveList = {
        'three': '3',
        'four': '4',
        'five': '5'
    }

    return new Promise((resolve, reject) => {
        const src = require(`assets/sounds/${instrument}/${name}${octaveList[octave]}.mp3`)

        var request = new XMLHttpRequest();
        request.open('GET', src, true);
        request.responseType = 'arraybuffer';

        request.onload = function () {

            context.decodeAudioData(request.response)
                .then((buffer)=> {
                        resolve({name, instrument, octave, buffer})
                    }
                ).catch((error) => {
                console.log(error)
            })
        }
        request.send();
    })
}

function pianoPromise({ octave, name }) {
    const octavePromises = []

    octave.forEach((number) => {
        octavePromises.push(loadSoundRequest({
            name,
            instrument: 'piano',
            octave: octave.key()
        }))
    })

    return [...octavePromises]
}

function guitarPromise({ octave, name }) {
    const octavePromises = []

    octave.forEach((number) => {
        individualNotePromises.push(loadSoundRequest({
            name,
            instrument: 'guitar',
            octave: octave.key()
        }))
    })

    return [...octavePromises]
}

async function recursiveMap(note) {
    //note is an individual Map() from tracker.
    let individualNotePromises = []

    note.map((instrument) => {
        switch (instrument.key) {
            case 'piano':
                individualNotePromises.push(pianoPromise({octave: note.get('piano'), name: note.get('name')}))
                break
            case 'guitar':
                individualNotePromises.push(guitarPromise({octave: note.get('guitar'), name: note.get('name')}))
                break
        }
    })

    return await Promise.all(individualNotePromises)
}

export async function loadNotes(tracker) {
    const promises = []
    //send those into loadSoundRequest one at a time.
    tracker.forEach((note) => {
        let soundNote = recursiveMap(note);
        console.log(soundNote)
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

const Note = Record({
    name: 'note name',
    piano: Map(),
    guitar: Map()
})

function addNote(notes, note) {
    return notes.set(note.get('name'), note)
}

//builds the note Map with links to the sound files.
//This should build the Notes from the promises.
function makeNotesInfo(tracker) {

    let notes = Map()

    //should loop over tracker instead.
    tracker.forEach((note) => {
        notes = addNote(notes, makeNote(note))
    })

    return notes
}