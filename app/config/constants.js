import { fromJS } from 'immutable'

export const sixMonths = 1.577e+10
export const context = new AudioContext || new window.webkitAudioContext;
export const notes = {
    A4:     {src: require('assets/sounds/piano/A4.mp3')},
    Ab4:    {src: require('assets/sounds/piano/Ab4.mp3')},
    B4:     {src: require('assets/sounds/piano/B4.mp3')},
    Bb4:    {src: require('assets/sounds/piano/Bb4.mp3')},
    C4:     {src: require('assets/sounds/piano/C4.mp3')},
    D4:     {src: require('assets/sounds/piano/D4.mp3')},
    Db4:    {src: require('assets/sounds/piano/Db4.mp3')},
    E4:     {src: require('assets/sounds/piano/E4.mp3')},
    Eb4:    {src: require('assets/sounds/piano/Eb4.mp3')},
    F4:     {src: require('assets/sounds/piano/F4.mp3')},
    G4:     {src: require('assets/sounds/piano/G4.mp3')},
    Gb4:    {src: require('assets/sounds/piano/Gb4.mp3')},
    A5:     {src: require('assets/sounds/piano/A5.mp3')},
    Ab5:    {src: require('assets/sounds/piano/Ab5.mp3')},
    B5:     {src: require('assets/sounds/piano/B5.mp3')},
    Bb5:    {src: require('assets/sounds/piano/Bb5.mp3')},
    C5:     {src: require('assets/sounds/piano/C5.mp3')},
    D5:     {src: require('assets/sounds/piano/D5.mp3')},
    Db5:    {src: require('assets/sounds/piano/Db5.mp3')},
    E5:     {src: require('assets/sounds/piano/E5.mp3')},
    Eb5:    {src: require('assets/sounds/piano/Eb5.mp3')},
    F5:     {src: require('assets/sounds/piano/F5.mp3')},
    G5:     {src: require('assets/sounds/piano/G5.mp3')},
    Gb5:    {src: require('assets/sounds/piano/Gb5.mp3')}
}

export const guitarNotes = {
    A4:     {src: require('assets/sounds/guitar/A4.mp3')},
    Ab4:    {src: require('assets/sounds/guitar/Ab4.mp3')},
    B4:     {src: require('assets/sounds/guitar/B4.mp3')},
    Bb4:    {src: require('assets/sounds/guitar/Bb4.mp3')},
    C4:     {src: require('assets/sounds/guitar/C4.mp3')},
    D4:     {src: require('assets/sounds/guitar/D4.mp3')},
    Db4:    {src: require('assets/sounds/guitar/Db4.mp3')},
    E4:     {src: require('assets/sounds/guitar/E4.mp3')},
    Eb4:    {src: require('assets/sounds/guitar/Eb4.mp3')},
    F4:     {src: require('assets/sounds/guitar/F4.mp3')},
    G4:     {src: require('assets/sounds/guitar/G4.mp3')},
    Gb4:    {src: require('assets/sounds/guitar/Gb4.mp3')},
    A3:     {src: require('assets/sounds/guitar/A3.mp3')},
    Ab3:    {src: require('assets/sounds/guitar/Ab3.mp3')},
    B3:     {src: require('assets/sounds/guitar/B3.mp3')},
    Bb3:    {src: require('assets/sounds/guitar/Bb3.mp3')},
    C3:     {src: require('assets/sounds/guitar/C3.mp3')},
    D3:     {src: require('assets/sounds/guitar/D3.mp3')},
    Db3:    {src: require('assets/sounds/guitar/Db3.mp3')},
    E3:     {src: require('assets/sounds/guitar/E3.mp3')},
    Eb3:    {src: require('assets/sounds/guitar/Eb3.mp3')},
    F3:     {src: require('assets/sounds/guitar/F3.mp3')},
    G3:     {src: require('assets/sounds/guitar/G3.mp3')},
    Gb3:    {src: require('assets/sounds/guitar/Gb3.mp3')}
}

export const tracker = [
    {name: 'C4', count: 0},
    {name: 'Db4', count: 0},
    {name: 'D4', count: 0},
    {name: 'Eb4', count: 0},
    {name: 'E4', count: 0},
    {name: 'F4', count: 0},
    {name: 'Gb4', count: 0},
    {name: 'G4', count: 0},
    {name: 'Ab4', count: 0},
    {name: 'A4', count: 0},
    {name: 'Bb4', count: 0},
    {name: 'B4', count: 0}
]