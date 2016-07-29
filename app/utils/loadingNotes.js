import { OrderedMap, Map, fromJS, List, Record } from 'immutable'
import { context } from 'config/constants'

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

function loadSoundRequest({ name, instrument, octave }) {
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
    let promise = octave.map((number) => {
        return loadSoundRequest({
            name,
            instrument: 'piano',
            octave: 'four'
        }).then((note) => note)
    })

    return promise
}

function guitarPromise(octave) {

    let promise = octave.map((number) => {
        return loadSoundRequest({
            name,
            instrument: 'guitar',
            octave: 'four'
        }).then((note) => note)
    })

    return promise
}

async function recursiveMap(note) {
    //note is an individual Map() from tracker.
    let individualNotePromises = []

    note.forEach((instrument) => {
        individualNotePromises.push(pianoPromise({octave: note.get('piano'), name: note.get('name')}))
        individualNotePromises.push(guitarPromise({octave: note.get('guitar'), name: note.get('name')}))
    })

    return await Promise.all(individualNotePromises)
}

export function loadNotes(tracker) {
    const promises = []
    //send those into loadSoundRequest one at a time.
    tracker.forEach((notes) => {
        recursiveMap(notes).then((note) => {
            //one thing you can get notes.get('name')
            //do addNotes process.
            //grab the maps off each element in the array, merge them, send the whole thing to addNotes.


            console.log(note)
        })
    })

    //resolve the super promise
    return Promise.all(promises)
        .then((data) => {
            data.forEach((note) => {
                newNotes = newNotes.setIn([note.name, 'piano', 'four'], note.obj)
                //console.log(newNotes)
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
        notes = addNote(notes, new Note({
            name: note.get('name'),
            piano: Map({
                four: note.getIn(['piano', 'four', 'buffer']),
                five: note.getIn(['piano', 'five', 'buffer'])
            }),
            guitar: Map({
                three: note.getIn(['guitar', 'three', 'buffer']),
                four: note.getIn(['guitar', 'four', 'buffer'])
            })
        }))
    })

    return notes
}

//call it with the tracker passed in from Redux?
export const notes = makeNotesInfo()