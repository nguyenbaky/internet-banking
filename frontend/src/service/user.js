import axios from "axios";
import config from "../config";
import service from "./index";
import store from 'store'

axios.defaults.baseURL = config.ROOT_API

const login = (username, password) => {
    return axios.post('/auth', {
        username: username,
        password: password
    })
        .then(service.handleResponse)
        .then(user => {
            store.set('user', user.data)
            return user
        })
        .catch(service.handleResponse)
}

function logout() {
    // remove user from local storage to log user out
    store.clearAll()
}

export const userService = {
    login,
    logout,
}