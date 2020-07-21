import axios from "axios";
import service from "./index"

const getAccount = _ => {
    return axios.get('/account', service.bearerHeader())
        .then(service.handleResponse)
        .catch(service.handleResponse)
}

const createSavingAccount = (name, balance) => {
    return axios.post('/account', {
        name: name,
        balance: balance
    }, service.bearerHeader())
        .then(service.handleResponse)
        .catch(service.handleResponse)
}

const delSavingAccount = savingAccountID => {
    return axios.delete(`/account/saving/${savingAccountID}`,
        service.bearerHeader())
        .then(service.handleResponse)
        .catch(service.handleResponse)
}

const updateSavingAccount = (savingAccountID, name, deltaBalance) => {
    return axios.put(`/account/saving/${savingAccountID}`, {
        name: name,
        delta_balance: deltaBalance
    }, service.bearerHeader())
        .then(service.handleResponse)
        .catch(service.handleResponse)
}

const getAccountInfo = accountNumber => {
    const url = `/account/${accountNumber}/info`
    return axios.get(url, service.bearerHeader())
        .then(service.handleResponse)
        .catch(service.handleResponse)
}

export const accountService = {
    getAccount,
    createSavingAccount,
    delSavingAccount,
    updateSavingAccount,
    getAccountInfo
}