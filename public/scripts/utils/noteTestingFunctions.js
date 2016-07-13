import { Map, List, fromJS } from 'immutable'

export function counterIncrement(targetNote, counter) {
    return counter.map
}

export function makeNotesMap() {
    const notes = fromJS({
        A4: {
            src: 'sounds/piano/A4',
            volume: 1
        },
        Ab4: {
            src: 'sounds/piano/Ab4',
            volume: 1
        },
        B4: {
            src: 'sounds/piano/B4',
            volume: 1
        },
        Bb4: {
            src: 'sounds/piano/Bb4',
            volume: 1
        },
        C4: {
            src: 'sounds/piano/C4',
            volume: 1
        },
        D4: {
            src: 'sounds/piano/D4',
            volume: 1
        },
        Db4: {
            src: 'sounds/piano/Db4',
            volume: 1
        },
        E4: {
            src: 'sounds/piano/E4',
            volume: 1
        },
        Eb4: {
            src: 'sounds/piano/Eb4',
            volume: 1
        },
        F4: {
            src: 'sounds/piano/F4',
            volume: 1
        },
        G4: {
            src: 'sounds/piano/G4',
            volume: 1
        },
        Gb4: {
            src: 'sounds/piano/Gb4',
            volume: 1
        }
    })

    return notes;
}

//take counter array and return a random targetNote if it hasn't been played 5 times.
export function randomNotes(tracker) {
    let availableNotes = List();

    //going to have to convert it to a map/list? Don't think so.
    tracker.map((item) => {
        if (item.count < 1) {
            availableNotes.push(item.name)
        }
    });

    return availableNotes.size > 0 ? availableNotes.get(Math.floor(availableNotes.size * Math.random())) : ''
}


//called on TrainingContainer Mount to use the closure in the child components.
export function loadNotes(notesMap) {
    const context = new AudioContext || new window.webkitAudioContext;

    const notes = notesMap;

    let loadSound = function (map) {
        const src = map.get('src');
        var request = new XMLHttpRequest();
        request.open('GET', `${src}.mp3`, true);
        request.responseType = 'arraybuffer';

        request.onload = function () {
            // request.response is encoded... so decode it now
            context.decodeAudioData(request.response, function (buffer) {
                map.set('buffer', buffer)
            }, function (err) {
                console.log(err);
            });
        };

        request.send();
    };

    //load the property names of the notes map:
    function loadSounds(map) {
        loadSound(map.keySeq());
    }

    loadSounds(notes);

    //this is a play sound closure.
    return function (note, seconds, volume = 1) {
        const source = context.createBufferSource();
        source.buffer = notes.getIn(note, 'buffer');
        //code for the volume
        notes.setIn([note, 'gainNode'],context.createGain())
        source.connect(notes.getIn(note, 'gainNode'))
        notes.setIn([note, 'volume'], volume)
        notes.setIn([note, 'gainNode', 'gain', 'value'], notes.getIn([note, 'volume']))
        let connect = notes.getIn([note, 'gainNode','connect'])
        connect()

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

