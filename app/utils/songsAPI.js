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
        const response = await axios.get('http://localhost:8000/authLogin', {withCredentials: true})
        //const popup = window.open(response.data.uri, "authWindow", 'width=800, height=600')
        login({url: response.data.uri}, callback)

        //window.addEventListener('message',(event) => {
        //    if(~event.origin.indexOf('http://localhost:8000/')) return
        //    window.clearInterval(event.data)
        //    event.source.close()
        //}, false)
        //in the auth url, we're going to authenticate.
        //that will call to spotify in /callback.
    } catch (error) {
        Error('Error in spotifyAuth', error)
    }
}


function login({ url }, callback) {
    const popup = window.open(url, "authWindow", 'width=800, height=600')
    const polltimer = window.setInterval(() => {
        if (popup.document.URL.indexOf("http://localhost:8080/oauthfinished") != -1) {
            window.clearInterval(polltimer)
            var url = popup.location.search
            var queryString = url.substring(1);
            const queryObject = parseQueryString({queryString})
            console.log(queryObject)
            callback()
            popup.close()
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
        console.log('arr:', arr)
        console.log('prev:', prev)
        console.log('params:', params)
        //return Object.assign({...prev}, prev[arr[0]] = arr[1])

        params[arr[0]] = arr[1]
        return params
    }, params)
};