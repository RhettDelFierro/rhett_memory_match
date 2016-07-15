import { fromJS } from 'immutable'

export const sixMonths = 1.577e+10
export const context = new AudioContext || new window.webkitAudioContext;
export const notes = fromJS({
    A4: {
        src: require('assets/sounds/piano/A4.mp3'),
        volume: 1
    },
    Ab4: {
        src: require('assets/sounds/piano/Ab4.mp3'),
        volume: 1
    },
    B4: {
        src: require('assets/sounds/piano/B4.mp3'),
        volume: 1
    },
    Bb4: {
        src: require('assets/sounds/piano/Bb4.mp3'),
        volume: 1
    },
    C4: {
        src: require('assets/sounds/piano/C4.mp3'),
        volume: 1
    },
    D4: {
        src: require('assets/sounds/piano/D4.mp3'),
        volume: 1
    },
    Db4: {
        src: require('assets/sounds/piano/Db4.mp3'),
        volume: 1
    },
    E4: {
        src: require('assets/sounds/piano/E4.mp3'),
        volume: 1
    },
    Eb4: {
        src: require('assets/sounds/piano/Eb4.mp3'),
        volume: 1
    },
    F4: {
        src: require('assets/sounds/piano/F4.mp3'),
        volume: 1
    },
    G4: {
        src: require('assets/sounds/piano/G4.mp3'),
        volume: 1
    },
    Gb4: {
        src: require('assets/sounds/piano/Gb4.mp3'),
        volume: 1
    }
})