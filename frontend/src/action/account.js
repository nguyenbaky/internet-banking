  
import {message} from "antd";
import {accountService} from '../service/account'
import {accountConstants} from "../constant/account";

const getAccounts = _ => {
    const request = _ => {
        message.loading('Vui lòng chờ ...', 0)
        return {type: accountConstants.GET_ACCOUNT_REQUEST}
    }

    const success = accounts => {
        message.destroy()
        message.success(accounts.message)
        let account = accounts.data
        return {type: accountConstants.GET_ACCOUNT_SUCCESS, account}
    }

    const failure = err => {
        message.destroy()
        message.error(err.toString())
        return {type: accountConstants.GET_ACCOUNT_FAILURE, err}
    }

    return dispatch => {
        dispatch(request())
        accountService.getAccount()
            .then(account => {
                dispatch(success(account))
            })
            .catch(err => {
                dispatch(failure(err))
            })
    }
}

const createSavingAccount = (name, balance) => {
    const request = _ => {
        message.loading('Vui lòng chờ ...', 0)
        return {type: accountConstants.CREATE_SAVING_ACCOUNT_REQUEST}
    }

    const success = accounts => {
        message.destroy()
        message.success(accounts.message)
        let account = accounts.data
        return {type: accountConstants.CREATE_SAVING_ACCOUNT_SUCCESS, account}
    }

    const failure = err => {
        message.destroy()
        message.error(err.toString())
        return {type: accountConstants.CREATE_SAVING_ACCOUNT_FAILURE, err}
    }

    return dispatch => {
        dispatch(request())
        accountService.createSavingAccount(name, balance)
            .then(account => {
                dispatch(success(account))
                dispatch(getAccounts())
            })
            .catch(err => {
                dispatch(failure(err))
            })
    }
}

const delSavingAccount = savingAccountID => {
    message.loading('Vui lòng chờ ...', 0)
    return dispatch => {
        accountService.delSavingAccount(savingAccountID)
            .then(account => {
                message.destroy()
                message.success(account.message)
                dispatch(getAccounts())
            })
            .catch(err => {
                message.destroy()
                message.error(err.toString())
            })
    }
}

const updateSavingAccount = (savingAccountID, name, deltaBalance) => {
    message.loading('Vui lòng chờ ...', 0)
    return dispatch => {
        accountService.updateSavingAccount(savingAccountID, name, deltaBalance)
            .then(account => {
                message.destroy()
                message.success(account.message)
                dispatch(getAccounts())
            })
            .catch(err => {
                message.destroy()
                message.error(err.toString())
            })
    }
}

export const accountAction = {
    getAccounts,
    createSavingAccount,
    updateSavingAccount,
    delSavingAccount,
}
