var testingFunctions = {
    //componentWillMount1
    loadNotes: function () {
        var myAudioContext,
            myBuffers = {}, mySource,
            mySpectrum;

        myAudioContext = new AudioContext() || new webkitAudioContext();
        // an analyser is used for the spectrum

        var bufferSound = function(event) {
            var request = event.target;
            var buffer = myAudioContext.createBuffer(request.response, false);
            myBuffers[request._soundName] = buffer;
        };

        var fetchSounds = function(notesArray) {
            var request = new XMLHttpRequest();
            for (var i = 0; i < notesArray.length; i++) {
                request = new XMLHttpRequest();
                // the underscore prefix is a common naming convention
                // to remind us that the variable is developer-supplied
                request._soundName = notesArray[i];
                request.open('GET', "../sounds/piano/" + request._soundName + '.mp3', true);
                request.responseType = 'arraybuffer';
                request.addEventListener('load', bufferSound, false);
                request.send();
            }
        };

        var makeNotesArray = function(){
            var notesArray = ["A4", "Ab4", "B4", "Bb4", "C4", "D4", "Db4", "E4", "Eb4", "F4", "G4", "Gb4"];
            fetchSounds(notesArray);
        };

        makeNotesArray();

        //return this function? Call it later when needed? Functional programming/closure.
        return function(soundName) {
            // create a new AudioBufferSourceNode
            var source = myAudioContext.createBufferSource();
            source.buffer = myBuffers[soundName];
            source.connect(myAudioContext.destination);
            // play right now (0 seconds from now)
            // can also pass myAudioContext.currentTime
            source.start(0,0,1);
            mySource = source;
        }

    }
};

//componentWillMount3

//componentWillMount2


//componentWillMount4
