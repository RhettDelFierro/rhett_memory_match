import { List, toJS } from 'immutable'

export function noteMatcher({notesChosen}) {
    const noteKeys = List(['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'])
    //then match the index of the notesChosen List to the index of the noteKeys List.
    const keys = notesChosen.map((value, key) => noteKeys.indexOf(value))
    return keys.toJS()
}