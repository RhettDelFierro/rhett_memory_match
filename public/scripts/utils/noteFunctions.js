var noteFunctions = {
    getNotes: function (counter) {
        //pull a random note.
        var randomNotes = RandomNotes(counter);
        console.log("noteFunction:getNotes",randomNotes);

        //Also returns note names to load into state:
        return {
            targetNote: randomNotes.targetNote,
            startingNote: randomNotes.startingNote
        }
    },
    //on componentDidMount, initialize a random counter object:
    initializeStartPoint: function () {

        //get two random frequencies:
        var targetNoteFrequency = notes.inm.target[Object.keys(notes.inm.target)[Math.floor(Math.random()
            * Object.keys(notes.inm.target).length)]];
        var startingNoteFrequency = notes.inm.starting[Object.keys(notes.inm.starting)[Math.floor(Math.random()
            * Object.keys(notes.inm.starting).length)]];

        var targetNoteName = KeepTrackTarget(targetNoteFrequency);
        var startingNoteName = KeepTrackStarting(startingNoteFrequency);

        console.log(targetNoteName, startingNoteName);
        //returns note names, not frequencies
        return {
            targetNote: targetNoteName,
            startingNote: startingNoteName
        }
    },
    whiteNoise: function () {
        WhiteNoise()
    },
    playTargetNote: function(targetNote){
        //get two note frequencies from their names:
        var target = TargetNameToFrequency(targetNote);
        console.log(target);
        MakeNote(target);
        setTimeout(WhiteNoise,1000);
    },
    playStartingNote: function(startingNote){
        var starting = StartingNameToFrequency(startingNote);
        MakeNote(starting);
    },
    //make the counter object. This keeps track of what has been played:
    keepCount: function (targetNote, startingNote, counter) {
        if (!counter[targetNote]) {
            counter[targetNote] = {}
        }

        if (!counter[targetNote][startingNote]) {
            counter[targetNote][startingNote] = 1
        } else if (counter[targetNote][startingNote] < 2) {
            counter[targetNote][startingNote]++
        }


        return counter;
    },
    //takes in the two note names. Frequency conversion handled also:
    checkerSelection: function (targetNote, startingNote, cents) {
        var startingFrequency = notes.inm.starting[startingNote];
        var targetFrequency = notes.inm.target[targetNote];

        var outputFrequency = startingFrequency * 2 ^ ((cents / 1000));

        //numerator will give us a number in the 100's, to get the number of half-notes, divide by 100.
        var accuracy = (1200 * Math.log2(targetFrequency, outputFrequency)) / 100;

        if ((accuracy > -1) && (accuracy < 1)) {
            return {
                outcome: true,
                accuracy: accuracy
            }
        } else {
            return {
                outcome: false,
                accuracy: accuracy
            }
        }
    },
    convertCents: function(cents, startingNote){
        var startingFrequency = notes.inm.starting[startingNote];
        var outputFrequency = startingFrequency * Math.pow(2,(cents/1000));
        console.log("starting note:", startingNote, "converted frequency: ", outputFrequency);
        MakeNote(outputFrequency);
    }

};

/**
 * @return {string}
 * gets name of note from frequency (target).
 */
function KeepTrackTarget(note) {
    for (var name in notes.inm.target) {
        if (note === notes.inm.target[name]) {
            return name
        }
    }
}

/**
 * @return {string}
 * gets name of note from frequency (starting).
 */
function KeepTrackStarting(note) {
    for (var name in notes.inm.starting) {
        if (note === notes.inm.starting[name]) {
            return name
        }
    }
}

/**
 * @return {string}
 * This function will return the name of the note if it hasn't been used twice.
 */
function RandomNotes(counter) {
    var availableNotes = [];
    for (var target in counter) {
        for (var starting in target) {
            if (starting < 2) {
                availableNotes.push({targetNote: target, startingNote: starting})
            }
        }
    }
    return availableNotes[availableNotes.length * Math.random()]
}

//these two functions take in a note name and return a frequency. Use this to play the sounds.
function TargetNameToFrequency(noteName) {
    for (var note in notes.inm.target) {
        if (noteName === note) {
            return notes.inm.target[note];
        }
    }
}
function StartingNameToFrequency(noteName) {
    for (var note in notes.inm.starting) {
        if (noteName === note) {
            return notes.inm.starting[note];
        }
    }
}

//plays note:
function MakeNote(note) {
    var context = new AudioContext;
    var oscillator = context.createOscillator();
    oscillator.frequency.value = note;
    console.log("here's the frequency:", note);

    oscillator.connect(context.destination);

    oscillator.start(0);

    setTimeout(function () {
        oscillator.stop(0)
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
    setTimeout(function () {
        node.stop(0)
    }, 1000)
}

var notes = {
    inm: {
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
    }
};


module.exports = noteFunctions;