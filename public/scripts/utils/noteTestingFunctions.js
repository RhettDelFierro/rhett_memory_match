var noteTestingFunctions = {
    loadNotes: function () {
        var context = new AudioContext || new window.webkitAudioContext;

        var notes = {
            A4: {
                src: 'public/sounds/piano/A4'
            },
            Ab4: {
                src: 'public/sounds/piano/Ab4'
            },
            B4: {
                src: 'public/sounds/piano/B4'
            },
            Bb4: {
                src: 'public/sounds/piano/Bb4'
            },
            C4: {
                src: 'public/sounds/piano/C4'
            },
            D4: {
                src: 'public/sounds/piano/D4'
            },
            Db4: {
                src: 'public/sounds/piano/Db4'
            },
            E4: {
                src: 'public/sounds/piano/E4'
            },
            Eb4: {
                src: 'public/sounds/piano/Eb4'
            },
            F4: {
                src: 'public/sounds/piano/F4'
            },
            G4: {
                src: 'public/sounds/piano/G4'
            },
            Gb4: {
                src: 'public/sounds/piano/Gb4'
            }
        };

        var loadSound = function (obj) {
            var request = new XMLHttpRequest();
            request.open('GET', obj.src + ".mp3", true);
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
            for (var note in obj) {
                if (obj.hasOwnProperty(note)) {
                    // load sound
                    loadSound(obj[note]);
                }
            }
        }

        loadSounds(notes);

        return function (note) {
            console.log(notes[note]);
            console.log(notes);
            var source = context.createBufferSource();
            source.buffer = notes[note].buffer;
            source.connect(context.destination);
            source.start(0,0,1);
        }

    }
};


module.exports = noteTestingFunctions;