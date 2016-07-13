import { fromJS } from 'immutable'

export const sixMonths = 1.577e+10
export const context = new AudioContext || new window.webkitAudioContext;
export const notes = fromJS({
    A4: {
        src: 'sounds/piano/A4',
        volume: 1
    },
    Ab4: {
        src: 'sounds/piano/Ab4',
        volume: 1
    },
    B4: {
        src: 'sounds/piano/B4',
        volume: 1
    },
    Bb4: {
        src: 'sounds/piano/Bb4',
        volume: 1
    },
    C4: {
        src: 'sounds/piano/C4',
        volume: 1
    },
    D4: {
        src: 'sounds/piano/D4',
        volume: 1
    },
    Db4: {
        src: 'sounds/piano/Db4',
        volume: 1
    },
    E4: {
        src: 'sounds/piano/E4',
        volume: 1
    },
    Eb4: {
        src: 'sounds/piano/Eb4',
        volume: 1
    },
    F4: {
        src: 'sounds/piano/F4',
        volume: 1
    },
    G4: {
        src: 'sounds/piano/G4',
        volume: 1
    },
    Gb4: {
        src: 'sounds/piano/Gb4',
        volume: 1
    }
})