var noteFunctions = {
    getNotes: function (counter) {
        //pull a random note.
        var randomNotes = RandomNotes(false, false);
        //check the random note

        switch (CheckNote(counter, randomNotes.targetNoteName, randomNotes.startingNoteName)) {
            case false:
                return {
                    targetNote: targetNoteName,
                    startingNote: startingNoteName
                };
            case true:
                newTryNote = RandomNotes(false, false);
        }

        if (!CheckNote(counter, randomNotes.targetNoteName, randomNotes.startingNoteName)) {
            return {
                targetNote: targetNoteName,
                startingNote: startingNoteName
            }
        } else {
            var newRandom = RandomNotes(randomNotes.targetIndex, randomNotes.startingIndex)
        }

    },
    whiteNoise: function () {
        WhiteNoise()
    },
    keepCount: function (targetNote, startingNote, counter) {
        if (!counter[targetNote]) {
            counter[targetNote] = {}
        }

        if (!counter[targetNote][startingNote]) {
            counter[targetNote][startingNote] = 1
        } else if (counter[targetNote][startingNote] < 2) {
            counter[targetNote][startingNote]++
        }
        //no else statement for counter[targetNote][startingNote] === 2,
        // just check for that in this.state.counter before playing the note.


        return counter;
    },
    checkerSelection: function (targetNote, startingNote, cents) {
        var startingFrequency = notes.starting[startingNote];
        var targetFrequency = notes.target[targetNote];

        var outputFrequency = startingFrequency * 2 ^ ((cents / 1000));

        //numberator will give us a number in the 100's, to get the number of half-notes, divide by 100.
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
    }

};

//give random notes.
//function RandomNotes(targetIndex, startingIndex) {
//
//    var targetNoteArray = [notes.inm.target["F#/Gb"], notes.inm.target["G"], notes.inm.target["G#/Ab"], notes.inm.target["A"]];
//    var randTarget = targetIndex || Math.floor(Math.random() * targetNoteArray.length);
//
//    //array of startingNotes and a random index.
//    var startingNoteArray = [notes.inm.starting["D"], notes.inm.starting["D#/Eb"],
//        notes.inm.starting["E"], notes.inm.starting["F"],
//        notes.inm.starting["A#/Bb"], notes.inm.starting["B"],
//        notes.inm.starting["C"], notes.inm.starting["C#/Db"]];
//    var randStarting = startingIndex || Math.floor(Math.random() * startingNoteArray.length);
//
//
//    //get the names of the two random notes.
//    var targetNoteName = KeepTracktarget(targetNoteArray[randTarget]);
//    var startingNoteName = KeepTrackStrating(startingNoteArray[randStarting]);
//
//    return {
//        targetNoteName: targetNoteName,
//        targetIndex: randTarget,
//        startingNoteName: startingNoteName,
//        startingIndex: randStarting
//    }
//}

/**
 * @return {string}
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
 */
function KeepTrackStarting(note) {
    for (var name in notes.starting) {
        if (note === notes.starting[name]) {
            return name
        }
    }
}

function RandomNotes(counter){
    for (var target in counter){
        for (var starting in name){
            if (starting < 2) {
                return {
                    targetNote: target,
                    startingNote: starting
                }
            }
        }
    }
}

/**
 * @return {boolean}
 */
function CheckNote(counter, targetNote, startingNote) {
    return (counter[targetNote][startingNote] === 2)
}

//plays target note
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