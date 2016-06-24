import axios from "axios"

function cookieFinder(name) {
    const cookie = document.cookie;
    const initialValue = {};

    return cookie.split(';').reduce((prev, c) => {
        var arr = c.split('=');
        return (arr[0].trim() == name ? arr[1] : prev);
    }, initialValue);
}

export function verifyName(user) {
    return axios.post("/username", {data: {username: user}})
        .then((response) => response.data)
        .catch((error) => console.log(error))
}

export function registerUser({user, email, password}) {
    return axios.post("/users/register", {data: {username: user, email: email, password: password}})
        .then((response) => response.data)
        .catch((error) => console.log(error))
}

export function loginUser({user, password}) {
    return axios.post("/users/login", {data: {login: user, password: password}})
        .then((response) => response.data)
        .catch((error) => console.log(error))
}

export function loginPassword(user) {
    return axios.post("/users/pw", {data: {login: user}})
        .then((response) => response.data)
        .catch((error) => console.log(error))
}
