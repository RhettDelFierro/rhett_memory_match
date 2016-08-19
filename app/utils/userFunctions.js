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
        return response.data;
    } catch (error){
        console.log(error);
    }
}

export async function registerUser({username, email, password}) {
    try {
        const response = await axios.post("http://localhost:8000/users/register", {data: {username, email, password}});
        console.log(response)
        return response.data
    } catch (error) {
        console.log(error);
    }

}

export async function loginUser({user, password}) {
    try {
        const response = await axios.post("/users/login", {data: {login: user, password: password}});
        return response.data
    } catch (error){
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
