import { Map, fromJS } from 'immutable'

export const sixMonths = 1.577e+10
export const context = new AudioContext || new window.webkitAudioContext;

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

class Note {

    constructor(name) {
        this.name = name;

        this.piano = {
            four: {
                src: require(`assets/sounds/piano/${name}4.mp3`),
                count: 0
            },
            five: {
                src: require(`assets/sounds/piano/${name}5.mp3`),
                count: 0
            }
        }

        this.guitar = {
            three: {
                src: require(`assets/sounds/guitar/${name}3.mp3`),
                count: 0
            },
            four: {
                src: require(`assets/sounds/guitar/${name}4.mp3`),
                count: 0
            }
        }
    }

    someMethod(){
        console.log(this)
    }
}

function addNote(notes, note){
    return notes.set(note.name, note)
}

function makeTracker() {
    const mainNotes = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']

    var notes = Map()

    mainNotes.forEach((note) =>{
        notes = addNote(notes, new Note(note))
    })

    return notes
}

export const notes = makeTracker()