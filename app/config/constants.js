import { fromJS } from 'immutable'

export const sixMonths = 1.577e+10
export const context = new AudioContext || new window.webkitAudioContext;
export const notes = makeTracker()

export const tracker = [
    {name: 'C', count: 0},
    {name: 'Db', count: 0},
    {name: 'D', count: 0},
    {name: 'Eb', count: 0},
    {name: 'E', count: 0},
    {name: 'F', count: 0},
    {name: 'Gb', count: 0},
    {name: 'G', count: 0},
    {name: 'Ab', count: 0},
    {name: 'A', count: 0},
    {name: 'Bb', count: 0},
    {name: 'B', count: 0}
]

function makeRequireString({name, instrument, octaveName}) {
    const octaves = {
        'three': 3,
        'four': 4,
        'five': 5
    }
    return require(`assets/sounds/${instrument}/${name}${octaves[octaveName]}.mp3`)
}

function makeOctave({ name, instrument, octaveName1, octaveName2 }) {
    return {
        [octaveName1]: {
            src: makeRequireString({name, instrument, octaveName: octaveName1}),
            count: 0
        },
        [octaveName2]: {
            src: makeRequireString({name, instrument, octaveName: octaveName2}),
            count: 0
        }
    }
}

function buildInstrument(instrument) {
    return ({
        [instrument]: {}
    })
}

function buildNoteObject(name) {
    return ({
        [name]: {}
    })
}

function fullNoteObject(name) {
    const tracker = buildNoteObject(name)

    //make a new function to run just the object.assign part?
    Object.assign(tracker[name], buildInstrument('piano'))
    Object.assign(tracker[name]['piano'], makeOctave({name: name, instrument: 'piano', octaveName1:'four', octaveName2: 'five'}))

    Object.assign(tracker[name], buildInstrument('guitar'))
    Object.assign(tracker[name]['guitar'], makeOctave({name: name, instrument: 'guitar', octaveName1: 'three', octaveName2: 'four'}))

    return tracker
}

function makeTracker() {
    const mainNotes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']
    const someCounter = {}
    mainNotes.map((name) => {
        Object.assign(someCounter, fullNoteObject(name))
    })

    return someCounter
}

