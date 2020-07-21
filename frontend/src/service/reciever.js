import axios from 'axios'
import service from "./index"

const getReciever = _ => {
    return axios.get('/reciever', service.bearerHeader())
        .then(service.handleResponse)
        .catch(service.handleResponse)
}

const createReciever = reciever => {
    return axios.post('/reciever', {...reciever}, service.bearerHeader())
        .then(service.handleResponse)
        .catch(service.handleResponse)
}

const deleteReciever = recieverAccountNumber => axios.delete(
    `/reciever/${recieverAccountNumber}`, service.bearerHeader())
    .then(service.handleResponse)
    .catch(service.handleResponse)

export const recieverService = {
    getReciever,
    createReciever,
    deleteReciever,
}