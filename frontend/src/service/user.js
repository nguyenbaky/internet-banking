import axios from "axios";
import config from "../config";
import service from "./index";

axios.defaults.baseURL = config.ROOT_API

const login = (username, password) => {
    console.log(`login service `,username,password)
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

const register = (user,role) => {
    return axios.post('/user/register', {
        name: user.name,
        email: user.email,
        password: user.password,
        role:role
    },service.bearerHeader())
        .then(service.handleResponse)
        .catch(service.handleResponse)
}

const sendOTP = () => {
    console.log(`service frontend sendotp`)
    return axios.post('/user/email',{},service.bearerHeader())
    .then(service.handleResponse)
    .catch(service.handleResponse)
}

const checkOTP = (otp) => {
    return axios.post('/user/checkOTP',{otp},service.bearerHeader())
        .then(service.handleResponse)
        .catch(service.handleResponse)
}

export const userService = {
    login,
    logout,
    register,
    sendOTP,
    checkOTP
}
