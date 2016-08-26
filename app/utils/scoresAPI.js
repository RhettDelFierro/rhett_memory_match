import axios from 'axios'

export async function setScoresAPI({mode, score, user_id, gamemode, round}) {
    try {
        const response = await axios.post(`http://localhost:8000/scores/${mode}`, {
            data: {
                user_id,
                score,
                gamemode,
                round
            }
        }, {headers: {'Authorization': 'Bearer ' + window.sessionStorage.getItem('token'),
            'Content-Type': 'application/json'},
            withCredentials: true
        });
        console.log(response)
        return response.data
    } catch (error) {
        Error('Error in setScoresAPI', error)
    }
}