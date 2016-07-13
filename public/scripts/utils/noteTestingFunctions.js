import { Map, List, fromJS } from 'immutable'
import { notes } from 'scripts/config/contants'

export function counterIncrement(targetNote, counter) {
    return counter.map
}

//Redux
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


let loadSound = function (map) {
    return new Promise((resolve, reject) => {
    const src = map.get('src');
    var request = new XMLHttpRequest();
    request.open('GET', `${src}.mp3`, true);
    request.responseType = 'arraybuffer';

    request.onload = function () {
        // request.response is encoded... so decode it now
        context.decodeAudioData(request.response)
            .then((buffer) => {
                resolve(map.set('buffer', buffer))
            }).catch((err) => {
            reject(err)
        })

        request.send();
    }
        //end of promise
    })

}


export function loadNotes() {
    //load the property names of the notes map:
    function loadSounds(map) {
        //probably should use promise.all
        Promise.all(loadSound(map.keySeq())).then(() => true).catch((err) => Error('Promise.all error:', err));
    }

    loadSounds(notes);
}

export function playNotes(note, seconds = 1, volume = 1) {
    return new Promise((resolve,reject) => {
    const source = context.createBufferSource();
    source.buffer = notes.getIn(note, 'buffer');
    //code for the volume
    notes.setIn([note, 'gainNode'], context.createGain())
    source.connect(notes.getIn(note, 'gainNode'))
    notes.setIn([note, 'volume'], volume)
    notes.setIn([note, 'gainNode', 'gain', 'value'], notes.getIn([note, 'volume']))
    let connect = notes.getIn([note, 'gainNode', 'connect'])
    connect()

    source.start(0, 0, seconds);
    })
}

//make for Redux
export function maskingNotes(tracker) {

    let newArray = List();

    for (let i = 0; i < 16; i++) {
        newArray.push(tracker.get(Math.floor(tracker.size * Math.random())).get('name'))
    }

    return newArray
}

//make adjustments to have volume control.
export function makeNoise() {
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
    node.start(0, 0, 1);
}

