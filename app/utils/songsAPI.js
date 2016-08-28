import axios from 'axios'

export async function getSongsAPI({note}) {
    try {
        console.log("the getSongsAPI:", note)
    } catch (error) {
        Error('Error in getSongsAPI', error)
    }
}