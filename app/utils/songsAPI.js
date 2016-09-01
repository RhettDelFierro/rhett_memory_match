import axios from 'axios'
import { List } from 'immutable'

export async function getSongsAPI({notesChosen}) {
    const noteKeys = List(['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'])
    //then match the index of the notesChosen List to the index of the noteKeys List.
    try {

    } catch (error) {
        Error('Error in getSongsAPI', error)
    }
}

export async function spotifyAuth() {
    try {
        const response = await axios.get('http://localhost:8000/authLogin',{withCredentials: true})
        //maybe try dispatching this link
        console.log(document.cookie)
        console.log(response)
        //the following is not returning a promise:
        login({ url: response.data.uri })
        //in the auth url, we're going to authenticate.
        //that will call to spotify in /callback.
    } catch (error) {
        Error('Error in spotifyAuth', error)
    }
}


function login({ url }) {
    const popup = window.open(url, "authWindow", 'width=800, height=600')
}