function MakeNote(note) {
    var context = new AudioContext;
    var oscillator = context.createOscillator();
    oscillator.frequency.value = note;

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


function RandomNotes(counter) {
    var availableNotes = [];
    console.log("here's counter: ", counter);
    var counter1 = counter;
    for (var target in notes.target) {
        for (var starting in notes.starting) {
            if (counter[target][starting] < 2) {
                availableNotes.push({targetNote: target, startingNote: starting})
            }
        }
    }
    return availableNotes[Math.floor(availableNotes.length * Math.random())]
}

//targetNoteName = target note.
//note is the name of the starting note.
//should take in the array of the notes played, will re-update, instead of startingNotesArray being set.
//this should be a function for each target note nested object.
//must figure out how to handle the notes array.
function MakeVotes(startingNotesArray) {
    var startingNoteCounts = {};
    var reducer = function (tally, note) {
        if (!tally[note]) {
            tally[note] = 1;
        } else if (tally[note] < 2) {
            tally[note] = tally[note] + 1;
        }
        return tally;
    };
    return startingNotesArray.reduce(reducer, startingNoteCounts)
}
//function NotesFromObject(counterObject){
//    var notesArray = [];
//    console.log(counterObject);
//    for (var target in counterObject){
//        for (var note in counterObject[target]){
//            console.log(note);
//            if (counterObject[target][note] < 2){
//                //that means the counterObject should have all notes in it.
//                var targetNote = notes.inm.target[target];
//                var startingNote = notes.inm.starting[note];
//                notesArray.push({targetNote: targetNote, startingNote: startingNote})
//            }
//        }
//    }
//    console.log(notesArray);
//    return notesArray[Math.floor(notesArray.length * Math.random())];
//}

function NotesFromObject(counterObject) {
    var notesArray = [];
    for (var target in counterObject) {
        for (var note in counterObject[target]) {
            console.log(note);
            if (counterObject[target][note] < 2) {
                //that means the counterObject should have all notes in it.
                var targetNote = notes.target[target];
                var startingNote = notes.starting[note];
                notesArray.push({targetNote: targetNote, startingNote: startingNote})
            } else if (counterObject[target][note] == 2) {

            }
        }
    }
    console.log(notesArray);
    return notesArray[Math.floor(notesArray.length * Math.random())];
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
        this.counter = 0,
        this.increase = function () {
            this.counter += 1;
        }
}
//called on handleSubmitNote > getNotes.
//Keeps track of targetNote/startingNote combinations.
function CountCombinations(targetNote, startingNote, counter) {

    for (i = 0; i <= counter.length - 1; i++) {
        if ((counter[i].targetNote === targetNote) && (counter[i].startingNote === startingNote) && counter[i].counter < 2) {
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
            availableNotes.push({targetNote: target, startingNote: starting})
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
    onSubmitSelection: function () {

    },
    //takes in the two note names. Frequency conversion handled also:
    //will have to change this to take in two frequencies.
    checkerSelection: function (targetNote, startingNote, cents) {
        var startingFrequency = notes.starting[startingNote];
        var targetFrequency = notes.target[targetNote];

        var outputFrequency = startingFrequency * Math.pow(2, (cents / 1000));

        //numerator will give us a number in the 100's, to get the number of half-notes, divide by 100.
        var accuracy = (1200 * Math.log2(targetFrequency, outputFrequency)) / 100;
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