import axios from "axios";
import config from "../config";
import service from "./index";

axios.defaults.baseURL = config.ROOT_API

const login = (username, password) => {
    return axios.post('/auth', {
        username: username,
        password: password
    })
        .then(service.handleResponse)
        .then(user => {
            console.log("user: ",user.data)
            localStorage.setItem('user',JSON.stringify(user.data))
            return user
        })
        .catch(service.handleResponse)
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user')
}

const register = user => {
    return axios.post('/user/register', {
        name: user.name,
        email: user.email,
        password: user.password,
    })
        .then(service.handleResponse)
        .catch(service.handleResponse)
}

export const userService = {
    login,
    logout,
    register
}
