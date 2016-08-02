import { OrderedMap, Map, fromJS, List, Record, toJS } from 'immutable'
import { context } from 'config/constants'

export let notesBuffer;

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
                Error('Error in loadSoundRequest', error)
            })
        }
        request.send();
    })
}

function extractMap(octavePromises) {
    return {
        [octavePromises[0].octave]: octavePromises[0].buffer,
        [octavePromises[1].octave]: octavePromises[1].buffer
    }
}

//fix both of these two promise functions to just return a map.
async function pianoPromise({ name }) {

    const four = loadSoundRequest({name, instrument: 'piano', octave: 'four'})
    const five = loadSoundRequest({name, instrument: 'piano', octave: 'five'})
    const data = await Promise.all([four, five])

    return extractMap(data)

}

async function guitarPromise({ name }) {

    const three = loadSoundRequest({name, instrument: 'guitar', octave: 'three'})
    const four = loadSoundRequest({name, instrument: 'guitar', octave: 'four'})
    const data = await Promise.all([three, four])

    return extractMap(data)
}

async function recursiveMap(note) {

    let noteMap = Map()
    const pianoNotes = pianoPromise({name: note.get('name')})
    const guitarNotes = guitarPromise({name: note.get('name')})
    noteMap = noteMap.setIn([note.get('name'), 'piano'], pianoNotes)
    noteMap = noteMap.setIn([note.get('name'), 'guitar'], guitarNotes)

    noteMap = noteMap.set('name', note.get('name'))

    return noteMap
}

export async function loadNotes(tracker) {
    //const jTracker = tracker.toJS()

    try {
        //send those into loadSoundRequest one at a time.
        const promises = tracker.map((notes) => {
            return recursiveMap(notes).then((note) => note)
        })

        //resolve the super promise
        return await Promise.all(promises)
    } catch (error) {
        Error('loadNotes error', error)
    }
}

const Note = Record({
    name: 'note name',
    piano: {
        four: {},
        five: {}
    },
    guitar: {
        three: {},
        four: {}
    }
})

function addNote(notes, note) {
    return notes.set(note.name, note)
}

//builds the note Map with links to the sound files.
//This should build the Notes from the promises.
export async function makeNotesInfo(trackerList) {
    //keep in mind trackerList is a regular Javascript array.
    try {
        let notes = Map()
        //just make it all a map.
        trackerList.forEach((note) => {
            console.log(note)
            notes = addNote(notes, new Note({
                name: note.name,
                piano: {
                    four: note.piano.four,
                    five: note.piano.five
                },
                guitar: {
                    three: note.guitar.three,
                    four: note.guitar.four
                }
            }))
        })
        return notes
    } catch (error) {
        Error('error in MakeNotesInfo', error)
    }
}

//call it with the tracker passed in from Redux?
//export const notes = makeNotesInfo()