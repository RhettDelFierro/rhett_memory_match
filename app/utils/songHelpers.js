import { List, toJS } from 'immutable'
import { context } from 'config/constants'

export function noteMatcher({notesChosen}) {
    const noteKeys = List(['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'])
    //then match the index of the notesChosen List to the index of the noteKeys List.
    const keys = notesChosen.map((value, key) => noteKeys.indexOf(value))
    return keys.toJS()
}

//accurate pitch recognition from songs is not 100% functional.
//add this feature at another time.
//export function visualSounds({audioDOM}) {
//    const audioElement = audioDOM
//
//    audioElement.addEventListener("canplay", function () {
//        const source = context.createMediaElementSource(audioElement);
//        //we need an analyser node to pass in audio data for our visualization:
//        const analyser = context.createAnalyser()
//        source.connect(analyser)
//        analyser.connect(context.destination);
//
//        //frequencyBinCount gives us the amount of values we get back from the analyser node.
//        //can change the value with analyser.fftSize property (must be in multiples of 2)
//        //Here's we're declaring an array frequencyData is just a byte array.
//        const frequencyData = new Uint8Array(analyser.frequencyBinCount);
//
//        function renderFrame() {
//            requestAnimationFrame(renderFrame);
//            // update data in frequencyData
//            analyser.getByteFrequencyData(frequencyData);
//        }
//        audioElement.start()
//        renderFrame()
//    });
//
//
//}