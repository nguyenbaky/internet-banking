import axios from 'axios'
import service from "./index"

const createTransaction = (transaction, recipientCharge, saveRecipient) => {
    return axios.post('/transaction', {
        transaction: transaction,
        recipient_charge: recipientCharge,
        save_recipient: saveRecipient,
    }, service.bearerHeader())
        .then(service.handleResponse)
        .catch(service.handleResponse)
}

const createMoney   = (transaction) => {
    return axios.post(`/transaction/createmoney`,{
        transaction 
    },service.bearerHeader())
        .then(service.handleResponse)
        .catch(service.handleResponse)
}

export const transactionService = {
    createTransaction,
    createMoney
}