import axios from "axios"

function cookieFinder(name) {
    const cookie = document.cookie;
    const initialValue = {};

    return cookie.split(';').reduce((prev, c) => {
        var arr = c.split('=');
        return (arr[0].trim() == name ? arr[1] : prev);
    }, initialValue);
}

export async function verifyName(user) {
    try {
        const response = axios.post("/username", {data: {username: user}});
        return response.data
    } catch (error) {
        console.log(error);
    }
}

export async function registerUser({username, email, password}) {
    try {
        const response = await axios.post("http://localhost:8000/users/register", {data: {username, email, password}});
        return response.data.data
    } catch (error) {
        console.log(error);
    }

}

export async function loginUser({email, password}) {
    try {
        const response = await axios.post("http://localhost:8000/users/login",
            {data: {email, password}}, {withCredentials: true});
        window.sessionStorage.setItem('token', response.data.data.token)
        console.log(response)
        return response.data.data
    } catch (error) {
        console.log(error)
    }
}

export async function logoutUser() {
    try {
        const response = await axios.post("http://localhost:8000/users/logout", {data: {value: 'some value'}}, {withCredentials: true});
        console.log(response)
        return response
    } catch (error) {
        console.log(error)
    }
}

export async function loginPassword(user) {
    try {
        const response = axios.post("/users/pw", {data: {login: user}});
        return response.data
    } catch (error) {
        console.log(error);
    }

}

export async function setScoresAPI({mode, score, user_id, gamemode, round}) {
    try {
        const response = await axios.post(`http://localhost:8000/scores/${mode}`, {
            data: {
                user_id,
                score,
                gamemode,
                round
            }
        }, {
            headers: {
                'Authorization': 'Bearer ' + window.sessionStorage.getItem('token')
            }, withCredentials: true});
        console.log(response)
        return response.data
    } catch (error) {
        Error('Error in setScoresAPI', error)
    }
}
