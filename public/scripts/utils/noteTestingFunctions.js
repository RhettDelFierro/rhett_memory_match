function makeNotesObject() {
    const notes = {
        A4: {
            src: 'public/sounds/piano/A4',
            volume: 1
        },
        Ab4: {
            src: 'public/sounds/piano/Ab4',
            volume: 1
        },
        B4: {
            src: 'public/sounds/piano/B4',
            volume: 1
        },
        Bb4: {
            src: 'public/sounds/piano/Bb4',
            volume: 1
        },
        C4: {
            src: 'public/sounds/piano/C4',
            volume: 1
        },
        D4: {
            src: 'public/sounds/piano/D4',
            volume: 1
        },
        Db4: {
            src: 'public/sounds/piano/Db4',
            volume: 1
        },
        E4: {
            src: 'public/sounds/piano/E4',
            volume: 1
        },
        Eb4: {
            src: 'public/sounds/piano/Eb4',
            volume: 1
        },
        F4: {
            src: 'public/sounds/piano/F4',
            volume: 1
        },
        G4: {
            src: 'public/sounds/piano/G4',
            volume: 1
        },
        Gb4: {
            src: 'public/sounds/piano/Gb4',
            volume: 1
        }
    };

    return notes;
}

//constructor for notes.
function NotesTracker(targetNote) {
    this.targetNote = targetNote,
        this.count = 0,
        this.increase = function () {
            this.count += 1;
        }
}

//initialize the counter (objects with targetNote and count properties):
function makeNotesArray() {
    const notes = makeNotesObject();

    let notesArray = [];

    for (let note in notes) {
        notesArray.push(new NotesTracker(note))
    }

    return notesArray;
}

//take counter array and return a random targetNote if it hasn't been played 5 times.
function RandomNotes(counter) {
    let availableNotes = [];

    counter.map((item) => {
        if (item.count < 1) {
            availableNotes.push(item.targetNote)
        }
    });

    return availableNotes[Math.floor(availableNotes.length * Math.random())] || "Finished"
}


//called on TrainingContainer Mount to use the closure in the child components.
export function loadNotes() {
    const context = new AudioContext || new window.webkitAudioContext;

    const notes = makeNotesObject();

    let loadSound = function (obj) {
        const { src } = obj;
        var request = new XMLHttpRequest();
        request.open('GET', `${src}.mp3`, true);
        request.responseType = 'arraybuffer';

        request.onload = function () {
            // request.response is encoded... so decode it now
            context.decodeAudioData(request.response, function (buffer) {
                obj.buffer = buffer;
            }, function (err) {
                console.log(err);
            });
        };

        request.send();
    };

    function loadSounds(obj) {

        // iterate over sounds obj
        for (let note in obj) {
            if (obj.hasOwnProperty(note)) {
                // load sound
                loadSound(obj[note]);
            }
        }
    }

    loadSounds(notes);

    //this is a play sound closure.
    return function (note, seconds, volume = 1) {
        const source = context.createBufferSource();
        source.buffer = notes[note].buffer;
        //code for the volume
        notes[note].gainNode = context.createGain();
        source.connect(notes[note].gainNode);
        notes[note].volume = volume;
        notes[note].gainNode.gain.value = notes[note].volume;
        notes[note].gainNode.connect(context.destination);

        source.start(0, 0, seconds);
    }

}
//should called on componentwill mount.
export function startTraining() {
    return makeNotesArray();
}

export function increaseCount(targetNote, counter) {
    for (let i = 0; i <= counter.length - 1; i++) {
        if ((counter[i].targetNote === targetNote) && (counter[i].count < 1)) {
            counter[i].increase();
            //stop the iteration, save memory and return the adjusted counter:
            return counter
        }
    }

    //no changes made, return counter:
    return counter;
}

export function getTargetNote(counter) {
    return RandomNotes(counter);
}

export function maskingNotes(counter) {

    let newArray = [];

    for (let i = 0; i < 16; i++) {
        newArray.push(counter[Math.floor(counter.length * Math.random())].targetNote)
    }

    return newArray
}

export function makeNoise() {
    var context = new AudioContext || new window.webkitAudioContext;
    var node = context.createBufferSource()
        , buffer = context.createBuffer(1, 4096, context.sampleRate)
        , data = buffer.getChannelData(0);

    for (var i = 0; i < 4096; i++) {
        data[i] = Math.random();
    }

    node.buffer = buffer;

    //volume- This works!
    var gain = context.createGain();
    gain.gain.value = 0.007;
    node.connect(gain);
    gain.connect(context.destination);

    node.loop = true;
    node.start(3, 0, 1);
    setTimeout(function () {
        context.close()
    }, 4000);
}
