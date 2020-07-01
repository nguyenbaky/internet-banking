import {userConstants} from "../constant/user";
import { Json } from "sequelize/types/lib/utils";

const getUser = _ => {
    try {
        let user =  JSON.parse(localStorage.getItem('user')) 
        return user ? user : null
    } catch (err) {
        console.error(err)
        return null
    }
}

let user = getUser()
const initialState = user ? {loggedIn: true, user} : {}

export const authentication = (state = initialState, action) => {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            }
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            }
        case userConstants.LOGIN_FAILURE:
            return {}
        case userConstants.LOGOUT:
            return {}
        default:
            return state
    }
}
