import axios from 'axios'
import { List } from 'immutable'

export async function getSongsAPI({notesChosen}) {
    const noteKeys = List(['C','Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'])
    //then match the index of the notesChosen List to the index of the noteKeys List.
    try {

    } catch (error) {
        Error('Error in getSongsAPI', error)
    }
}

export async function spotifyAuth(){
    try {
        const data = axios.get('http://localhost:8000/login')
        console.log(data)
    } catch (error) {
        Error('Error in spotifyAuth', error)
    }
}