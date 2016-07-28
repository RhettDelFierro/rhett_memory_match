import { OrderedMap, Map, fromJS, List, Record } from 'immutable'

export const sixMonths = 1.577e+10
export const context = new AudioContext || new window.webkitAudioContext;

//instantiate everything and set the redux store.

//tracker that will also send info to the web audio player.
//potential problem: initialState of Redux will depend on tracker which will come from a returned function.
//must find a way to run this before the store?
export const tracker = makeTracker()

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

function makeTracker() {
    const notes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
    notes.forEach((note) => {
        tracker.push(makeTrackerNote(note))
    })
}

const Note = Record({
    name: 'note name',
    piano: Map(),
    guitar: Map()
})

//builds the Map with the note links. WIll add the .buffer to it.
function makeNote(name) {
    return fromJS({
        name: name,
        piano: {
            four: {
                src: require(`assets/sounds/piano/${name}4.mp3`),
                buffer: {}
            },
            five: {
                src: require(`assets/sounds/piano/${name}5.mp3`)
            }
        },
        guitar: {
            three: {
                src: require(`assets/sounds/guitar/${name}3.mp3`)
            },
            four: {
                src: require(`assets/sounds/guitar/${name}4.mp3`)
            }
        }
    })
}

//makes the total notes Map have the note names as the properties.
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

//this will handle everything individually:
function loadSoundRequest(obj, name, instrument, octave) {
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

function pianoPromise(octave){

}

function guitarPromise(octave){

}

function recursiveMap(note) {
    //note is an individual Map() from tracker.
    let individualNotePromises = []

    note.map((instrument) => {
        if (instrument.key('piano')){
            instrument.get('piano').forEach((octave) => {
                individualNotePromises.push(loadSoundRequest({
                    name: note.get('name'),
                    instrument: 'piano',
                    octave: octave.key()
                }))
            })
        }
        if (instrument.key('guitar')){
            instrument.get('guitar').forEach((octave) => {
                individualNotePromises.push(loadSoundRequest({
                    name: note.get('name'),
                    instrument: 'guitar',
                    octave: octave.key()
                }))
            })
        }

    })

    note.map((instrument) => {
        switch(instrument.key()) {
            case 'piano':
                individualNotePromises.push(pianoPromise(instrument.get('piano')))
                break
            case 'guitar':
                individualNotePromises.push(guitarPromise(instrument.get('guitar')))
                break
        }
    })

    return Promise.all(individualNotePromises)
}


export async function loadNotes(tracker) {
    const promises = []
    //send those into loadSoundRequest one at a time.
    tracker.forEach((note) => {
        recursiveMap(note).then()
        //promises.push(loadSoundRequest({ name: note.get('name'), instrument: note.getIn(['name','piano']), octave:  })
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


export let notes = makeTracker()