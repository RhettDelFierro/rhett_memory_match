import axios from 'axios'
import { List,toJS } from 'immutable'

export async function getSongsAPI({notesChosen}) {
    const noteKeys = List(['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'])
    //then match the index of the notesChosen List to the index of the noteKeys List.
    const keys = notesChosen.map((value, key) => noteKeys.indexOf(value))
    const songKeysArray = keys.toJS()

    try {
        let songs = await axios.post('http://localhost:8000/getKeys', {data: {songKeysArray}}, {
            headers: {
                'Authorization': 'Bearer ' + window.sessionStorage.getItem('Spotify_token')
            }, withCredentials: true
        })
        const tracks = songs.data.data

        return tracks.map((key) => {
            noteName = noteKeys.find((value,index) => (index === key))
            return {
                [noteName]: tracks[key]
            }
        })
    } catch (error) {
        Error('Error in getSongsAPI', error)
    }
}

//do NOT forget the error callback.
export async function spotifyAuth({callback}) {
    try {
        const response = await axios.get('http://localhost:8000/authLogin', {withCredentials: true})
        login({url: response.data.uri, callback})
    } catch (error) {
        Error('Error in spotifyAuth', error)
    }
}


function login({ url,callback }) {
    const popup = window.open(url, "authWindow", 'width=800, height=600')
    const polltimer = window.setInterval(() => {
        try {
            if (popup.document.URL.indexOf("http://localhost:8080/oauthfinished") != -1) {
                window.clearInterval(polltimer)
                var url = popup.location.search
                var queryString = url.substring(1);
                const queryObject = parseQueryString({queryString})
                popup.opener.sessionStorage.setItem('Spotify_token', queryObject["token"])
                callback({id: queryObject["id"]})
                popup.close()
                return queryObject
            }
        } catch (error) {
            console.log(error)
        }
    }, 100)
}

//use .reduce instead.
var parseQueryString = function ({ queryString }) {
    console.log(queryString)
    const params = {}
    // Split into key/value pairs
    return queryString.split("&").reduce((prev, c) => {
        const arr = c.split('=')
        params[arr[0]] = arr[1]
        return params
    }, params)
};