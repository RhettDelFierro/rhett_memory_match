var noteFunctions = {
    playTargetNote: function (counter) {
        //this can return back to this.setState: notePlayed array. This array can be the one that goes into keepCount as notesArray.
        var targetNoteArray = [notes.inm.target["F#/Gb"], notes.inm.target["G"], notes.inm.target["G#/Ab"], notes.inm.target["A"]];
        var rand = Math.floor(Math.random() * targetNoteArray.length);

        var targetNoteName = KeepTrack(targetNoteArray[rand]);

        var counterCheck = CutNote();

        if (counter[targetNote][startingNote] != 2) {
            MakeNote(targetNoteArray[rand]);
        }

        //maybe don't call it here, but after the state is set.
        WhiteNoise();

        //the note has been played. Now play the white noise, then the target note, then their selections.
        //check their selection
        // Now to keep the count on the target note played and the target note that was chosen

        return KeepTrack(targetNoteArray[rand]);

    },
    playStartingNote: function (counter) {
        var startingNoteArray = [notes.inm.starting["D"], notes.inm.starting["D#/Eb"],
            notes.inm.starting["E"], notes.inm.starting["F"],
            notes.inm.starting["A#/Bb"], notes.inm.starting["B"],
            notes.inm.starting["C"], notes.inm.starting["C#/Db"]];
        var rand = Math.floor(Math.random() * startingNoteArray.length);
        //make sure to give a prompt that they'll adjust after this note is finished:
        MakeNote(startingNoteArray[rand]);

        return KeepTrackTarget(startingNoteArray[rand]);
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

function KeepTrackTarget(note) {
    for (var name in notes.target) {
        if (note === notes.target[name]) {
            return name
        }
    }

}

function KeepTrackStarting(note) {
    for (var name in notes.starting) {
        if (note === notes.starting[name]) {
            return name
        }
    }

}

function CutNote(counter, targetNote, startingNote) {
    if (counter[KeepTrackTarget(targetNote)][KeepTrackStarting(startingNote)] === 2){
        return false
    }
    return true
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

//checks the answer.
function Checker(targetNote, startingNote, cents) {
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