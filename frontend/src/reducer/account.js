import {accountConstants} from "../contstant/account";

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