import { OrderedMap, Map, fromJS, List, Record, toJS } from 'immutable'
import { context } from 'config/constants'

let counter = 0;

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
    //console.log(name, instrument, octave)
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

function extractMap(octavePromises) {
    return Map({
        [octavePromises[0].octave]: octavePromises[0].buffer,
        [octavePromises[1].octave]: octavePromises[1].buffer
    })

}

//fix both of these two promise functions to just return a map.
async function pianoPromise({ octave, name }) {

    const four = loadSoundRequest({ name, instrument: 'piano', octave: 'four' })
    const five = loadSoundRequest({ name, instrument: 'piano', octave: 'five' })

    const data = await Promise.all([four, five])
    return extractMap(data)

}

async function guitarPromise({ octave, name }) {

    const three = loadSoundRequest({ name, instrument: 'guitar', octave: 'three' })
    const four = loadSoundRequest({ name, instrument: 'guitar', octave: 'four' })
    const data = await Promise.all([three, four])

    return extractMap(data)
}

async function recursiveMap(note) {
    let noteMap = Map()

    note.forEach((instrument) => {
        //can make this a switch instead:

        if (instrument === note.get('piano')) {
            noteMap = noteMap.setIn([note.get('name'), 'piano'], pianoPromise({
                octave: note.get('piano'),
                name: note.get('name')
            }))
        }

        if (instrument === note.get('guitar')) {
            noteMap = noteMap.setIn([note.get('name'), 'guitar'], guitarPromise({
                octave: note.get('guitar'),
                name: note.get('name')
            }))
        }
    })
    return await noteMap
}

export async function loadNotes(tracker) {

    //send those into loadSoundRequest one at a time.
    const promises = tracker.map((notes) => {
        return recursiveMap(notes).then((note) => note)
    })

    //resolve the super promise
    const newTrackerList = await Promise.all(promises)
    makeNotesInfo(newTrackerList)
}

const Note = Record({
    name: 'note name',
    piano: Map(),
    guitar: Map()
})

function addNote(notes, note) {
    console.log(notes.toJS())
    return notes.set(note.get('name'), note)
}

//builds the note Map with links to the sound files.
//This should build the Notes from the promises.
async function makeNotesInfo(trackerList) {
    let notes = Map()

    //should loop over tracker instead.
    await trackerList.forEach((note) => {
        console.log(note.toJS())
        notes = addNote(notes, new Note({
            name: note,
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
    console.log(notes)
    return notes
}

//call it with the tracker passed in from Redux?
//export const notes = makeNotesInfo()