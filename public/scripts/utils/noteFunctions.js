
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


var noteFunctions = {
    inm: {
        startingHigh: {
            noteASharp:466.164,
            noteB: 493.883,
            noteC: 523.251,
            noteCSharp: 554.365
        },
        startingLow: {
            noteD: 293.665,
            noteDSharp: 311.127,
            noteE: 329.628,
            noteF: 349.228
        },
        target: {
            noteFSharp: 369.994,
            noteG: 391.995,
            noteGSharp: 415.305,
            noteA: 440.000
        }
    }
};

//probably use reduce once again.
var combinations = {
  noteFSharp: {
      noteASharp: 2,
      noteB: 2,
      noteC: 2,
      noteCSharp: 2,
      noteD: 2,
      noteDSharp: 2,
      noteE: 2,
      noteF: 2
  },
    noteG: {
        NoteASharp: 2,
        noteB: 2,
        noteC: 2,
        noteCSharp: 2,
        noteD: 2,
        noteDSharp: 2,
        noteE: 2,
        noteF: 2
    },
    noteGSharp: {
        NoteASharp: 2,
        noteB: 2,
        noteC: 2,
        noteCSharp: 2,
        noteD: 2,
        noteDSharp: 2,
        noteE: 2,
        noteF: 2
    },
    noteA: {
        NoteASharp: 2,
        noteB: 2,
        noteC: 2,
        noteCSharp: 2,
        noteD: 2,
        noteDSharp: 2,
        noteE: 2,
        noteF: 2
    }
};