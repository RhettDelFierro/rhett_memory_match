function MakeNote(note) {
    var context = new AudioContext;
    var oscillator = context.createOscillator();
    oscillator.frequency.value = note;

    oscillator.connect(context.destination);

    oscillator.start(0);

    setTimeout(function () {
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
    setTimeout(function () {
        node.stop(0);
        context.close();
    }, 1000)
}

/**
 * @return {string}
 * gets name of note from frequency (target).
 */
function KeepTrackTarget(note) {
    for (var name in notes.target) {
        if (note === notes.target[name]) {
            return name
        }
    }
}

/**
 * @return {string}
 * gets name of note from frequency (starting).
 */
function KeepTrackStarting(note) {
    for (var name in notes.starting) {
        if (note === notes.starting[name]) {
            return name
        }
    }
}
//these two functions take in a note name and return a frequency. Use this to play the sounds.
function TargetNameToFrequency(noteName) {
    for (var note in notes.target) {
        if (noteName === note) {
            return notes.target[note];
        }
    }
}
function StartingNameToFrequency(noteName) {
    for (var note in notes.starting) {
        if (noteName === note) {
            return notes.starting[note];
        }
    }
}

var notes = {

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
    var availableNotes = [];
    counter.map(function(item){
        if (item.count < 2){
            availableNotes.push({targetNote: item.targetNote, startingNote: item.startingNote})
        }
    });
    return availableNotes[Math.floor(availableNotes.length * Math.random())]
}

var noteFunctions = {
    getNotes: function (targetNote, startingNote, counter) {

        var notesArray = CountCombinations(targetNote, startingNote, counter);
        var randomNote = RandomNotes(notesArray);
        return {
            targetNote: randomNote.targetNote,
            startingNote: randomNote.startingNote,
            counter: notesArray
        }
    },
    //on componentDidMount, initialize a random counter object:
    initializeStartPoint: function () {
        //get two random frequencies:
        var counter = [];
        for (var target in notes.target){
            for (var starting in notes.starting){
                counter.push(new NotesTracker(target, starting))
            }
        }
        var randomNote =  counter[Math.floor(counter.length * Math.random())];
        //returns note names, not frequencies
        return {
            targetNote: randomNote.targetNote,
            startingNote: randomNote.startingNote,
            counter: counter
        }
    },
    whiteNoise: function () {
        WhiteNoise()
    },
    playTargetNote: function (targetNote) {
        //get two note frequencies from their names:
        var target = TargetNameToFrequency(targetNote);
        MakeNote(target);
        setTimeout(WhiteNoise, 1000);
    },
    playStartingNote: function (startingNote) {
        var starting = StartingNameToFrequency(startingNote);
        MakeNote(starting);
    },
    playGuessNote: function(startingNote, centsValue){
        var startingFrequency = notes.starting[startingNote];
        var cents = centsValue;

        console.log(cents);

        var outputFrequency = startingFrequency * Math.pow(2, (cents / 1000));

        MakeNote(outputFrequency);
    },
    onSubmitSelection: function () {

    },
    //takes in the two note names. Frequency conversion handled also:
    //will have to change this to take in two frequencies.
    checkerSelection: function (targetNote, startingNote, cents) {
        var startingFrequency = notes.starting[startingNote];
        var targetFrequency = notes.target[targetNote];

        var outputFrequency = startingFrequency * Math.pow(2, (cents / 1000));

        //numerator will give us a number in the 100's, to get the number of half-notes, divide by 100.
        var accuracy = (1200 * Math.log2(targetFrequency/outputFrequency)) / 100;
        console.log(accuracy);
        return accuracy;
    },
    convertCents: function (cents, startingNote) {
        var startingFrequency = notes.starting[startingNote];
        var outputFrequency = startingFrequency * Math.pow(2, (cents / 1000));
        MakeNote(outputFrequency);
        return ({
            checkingFrequency: outputFrequency
        })
    }

};

module.exports = noteFunctions;