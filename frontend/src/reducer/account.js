import {accountConstants} from "../constant/account";

export const account = (state = {}, action) => {
    switch (action.type) {
        case accountConstants.GET_ACCOUNT_SUCCESS:
            return {
                ...action.account
            }
        case accountConstants.GET_ACCOUNT_FAILURE:
            return {}
        default:
            return state
    }
}

export const accountInfo = (state = {}, action) => {
    switch (action.type) {
        case accountConstants.GET_ACCOUNT_INFO_SUCCESS:
            return {...action.data}
        case accountConstants.GET_ACCOUNT_INFO_FAILURE:
            return {}
        default:
            return state
    }
}