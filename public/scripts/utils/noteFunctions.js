function MakeNote(note) {
    var context = new AudioContext() || new webkitAudioContext();
    var oscillator = context.createOscillator();
    oscillator.frequency.value = note;

    oscillator.connect(context.destination);

    oscillator.start(0);

    setTimeout(() => {
        oscillator.stop(0);
        context.close();
    }, 250)
}

//plays masking note
function WhiteNoise() {
    var context = new AudioContext;
    var node = context.createBufferSource()
        , buffer = context.createBuffer(1, 4096, context.sampleRate)
        , data = buffer.getChannelData(0);

    for (var i = 0; i < 4096; i++) {
        data[i] = Math.random();
    }
    node.buffer = buffer;
    node.loop = true;
    node.connect(context.destination);
    node.start(0);
    setTimeout(() => {
        node.stop(0);
        context.close();
    }, 1000)
}

//these two functions take in a note name and return a frequency. Use this to play the sounds.
function TargetNameToFrequency(noteName) {
    for (let note in notes.target) {
        if (noteName === note) {
            return notes.target[note];
        }
    }
}
function StartingNameToFrequency(noteName) {
    for (let note in notes.starting) {
        if (noteName === note) {
            return notes.starting[note];
        }
    }
}

const notes = {

    starting: {
        "D": 293.665,
        "D#/Eb": 311.127,
        "E": 329.628,
        "F": 349.228,
        "A#/Bb": 466.164,
        "B": 493.883,
        "C": 523.251,
        "C#/Db": 554.365
    },
    target: {
        "F#/Gb": 369.994,
        "G": 391.995,
        "G#/Ab": 415.305,
        "A": 440.000
    }

};

function NotesTracker(targetNote, startingNote) {
    this.targetNote = targetNote,
        this.startingNote = startingNote,
        this.count = 0,
        this.increase = function () {
            this.count += 1;
        }
}
//called on handleSubmitNote > getNotes.
//Keeps track of targetNote/startingNote combinations.
function CountCombinations(targetNote, startingNote, counter) {

    for (i = 0; i <= counter.length - 1; i++) {
        if ((counter[i].targetNote === targetNote) && (counter[i].startingNote === startingNote) && counter[i].count < 2) {
            counter[i].increase();
            //stop the iteration, save memory and return the adjusted counter:
            return counter
        }
    }
    //no changes made, return counter:
    return counter
}
//generate a random target/starting note combination.
function RandomNotes(counter) {
    let availableNotes = [];
    counter.map((item) => {
        if (item.count < 2) {
            availableNotes.push({targetNote: item.targetNote, startingNote: item.startingNote})
        }
    });
    return availableNotes[Math.floor(availableNotes.length * Math.random())]
}

export function getNotes(targetNote, startingNote, counter) {

    const notesArray = CountCombinations(targetNote, startingNote, counter);
    const randomNote = RandomNotes(notesArray);
    return {
        targetNote: randomNote.targetNote,
        startingNote: randomNote.startingNote,
        counter: notesArray
    }
}
//on componentDidMount, initialize a random counter object:
export function initializeStartPoint() {
    //get two random frequencies:
    let counter = [];
    for (let target in notes.target) {
        for (let starting in notes.starting) {
            counter.push(new NotesTracker(target, starting))
        }
    }
    let randomNote = counter[Math.floor(counter.length * Math.random())];
    //returns note names, not frequencies
    return {
        targetNote: randomNote.targetNote,
        startingNote: randomNote.startingNote,
        counter: counter
    }
}

export function whiteNoise() {
    WhiteNoise()
}

export function playTargetNote(targetNote) {
    //get two note frequencies from their names:
    const target = TargetNameToFrequency(targetNote);
    MakeNote(target);
    setTimeout(WhiteNoise, 1000);
}

export function playStartingNote(startingNote) {
    const starting = StartingNameToFrequency(startingNote);
    MakeNote(starting);
}

export function playGuessNote(startingNote, centsValue) {
    const startingFrequency = notes.starting[startingNote];
    const cents = centsValue;

    const outputFrequency = startingFrequency * Math.pow(2, (cents / 1000));

    MakeNote(outputFrequency);
}

//takes in the two note names. Frequency conversion handled also:
//will have to change this to take in two frequencies.
export function checkerSelection(targetNote, startingNote, cents) {
    const startingFrequency = notes.starting[startingNote];
    const targetFrequency = notes.target[targetNote];

    const outputFrequency = startingFrequency * Math.pow(2, (cents / 1000));

    //numerator will give us a number in the 100's, to get the number of half-notes, divide by 100.
    const accuracy = (1200 * Math.log2(targetFrequency / outputFrequency)) / 100;
    console.log(accuracy);
    return accuracy;
}

export function convertCents(cents, startingNote) {
    const startingFrequency = notes.starting[startingNote];
    const outputFrequency = startingFrequency * Math.pow(2, (cents / 1000));
    MakeNote(outputFrequency);
    return ({
        checkingFrequency: outputFrequency
    })
}

export function getAverage(guessesArray) {
    let absoluteValueArray = guessesArray.map((item) => Math.abs(item));
    let initialValue = 0;
    let reducer = function (accumulator, item) {
        return accumulator + item
    };
    let total = absoluteValueArray.reduce(reducer, initialValue);
    return total / absoluteValueArray.length;
}
