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

export async function spotifyAuth(callback) {
    try {
        const response = await axios.get('http://localhost:8000/authLogin',{withCredentials: true})
        const popup = window.open(response.data.uri, "authWindow", 'width=800, height=600')
        //login({ url: response.data.uri })

        window.addEventListener('message',(event) => {
            if(~event.origin.indexOf('http://localhost:8000/')) return
            window.clearInterval(event.data)
            event.source.close()
        }, false)
        //in the auth url, we're going to authenticate.
        //that will call to spotify in /callback.
    } catch (error) {
        Error('Error in spotifyAuth', error)
    }
}


function login({ url }) {
    const popup = window.open(url, "authWindow", 'width=800, height=600')
    const polltimer = window.setInterval(() => {
        popup.postMessage(polltimer, "http://localhost:8000")
    }, 100)
}