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
        const response = await axios.get('http://localhost:8000/authLogin')
        console.log(response.data.uri)
        const authRedirect = await login({ authURL: response.data.uri, redirectURL: "http://localhost:8000/callback"})
        const loginInfo = await axios.get(authRedirect)
    } catch (error) {
        Error('Error in spotifyAuth', error)
    }
}

function login({authURL, redirectURL}) {
    var win = window.open(authURL, "authWindow", 'width=800, height=600');
    console.log(win.document.URL)
    var pollTimer = window.setInterval(function () {
        try {
            console.log(win.document.URL);
            if (win.document.URL.indexOf(redirectURL) != -1) {
                window.clearInterval(pollTimer);
                var callBackUrl = win.document.URL;
                win.close();
                return callBackUrl
            }
        } catch (e) {
            console.log(e)
        }
    }, 100);
}