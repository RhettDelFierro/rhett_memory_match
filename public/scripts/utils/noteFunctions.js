var noteFunctions = {
    playNote: function(note){
        MakeNote(notes.note)
    },
    whiteNoise: function(){
        WhiteNoise()
    },
    checkerSelection: function(){
        Checker()
    }

};


function MakeNote(note){
    var context = new AudioContext;
    var oscillator = context.createOscillator();
    oscillator.frequency.value = note;

    oscillator.connect(context.destination);

    oscillator.start(0);

    setTimeout(function(){
        oscillator.stop(0)
    }, 250)
}

function WhiteNoise(){
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
    setTimeout(function(){
        node.stop(0)
    }, 1000)
}

function Checker(targetFrequency, startingFrequency, cents, targetNote, counter){

    var notesArray = ["C","C#/Db", "D", "D#/Eb", "E", "F", "A#/Bb", "B"];

    var reducer = function(tally, notesArray) {
        if(!tally[notesArray]){
            tally[notesArray] = 1
        } else if (tally[notesArray] < 2){
            tally[notesArray] = tally[notesArray] + 1
        }
    };

    //result will be the combination of notes played.
    var result = votes.reduce(reducer, counter);

    var outputFrequency = startingNote * 2^((cents/1000));

    //numberator will give us a number in the 100's, to get the number of half-notes, divide by 100.
    var accuracy = (1200*Math.log2(targetNote,outputFrequency))/100;



    if (accuracy < 1) {
        return {
            outcome: true,
            accuracy: accuracy,
            combinationsUsed: result
        }
    }
}


var notes = {
    inm: {
        startingHigh: {
            "A#/Bb":466.164,
            "B": 493.883,
            "C": 523.251,
            "C#/Db": 554.365
        },
        startingLow: {
            "D": 293.665,
            "D#/Eb": 311.127,
            "E": 329.628,
            "F": 349.228
        },
        target: {
            "F#/Gb": 369.994,
            "G": 391.995,
            "G#/Ab": 415.305,
            "A": 440.000
        }
    }
};

//probably use reduce once again.
var combinations = {
    "F#/Gb": {
      "A#/Bb": 2,
      "B": 2,
      "C": 2,
      "C#/Db": 2,
      "D": 2,
      "D#/Eb": 2,
      "E": 2,
      "F": 2
  },
    "G": {
        "A#/Bb": 2,
        "B": 2,
        "C": 2,
        "C#/Db": 2,
        "D": 2,
        "D#/Eb": 2,
        "E": 2,
        "F": 2
    },
    "G#/Ab": {
        "A#/Bb": 2,
        "B": 2,
        "C": 2,
        "C#/Db": 2,
        "D": 2,
        "D#/Eb": 2,
        "E": 2,
        "F": 2
    },
    "A": {
        "A#/Bb": 2,
        "B": 2,
        "C": 2,
        "C#/Db": 2,
        "D": 2,
        "D#/Eb": 2,
        "E": 2,
        "F": 2
    }
};

module.exports = noteFunctions;