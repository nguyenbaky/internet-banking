import {combineReducers} from "redux"
import {authentication} from "./authentication"
import {account,accountInfo} from "./account";
import {reciever} from './reciever'
import {staff} from './staff'

const rootReducer = combineReducers({
    authentication,
    account,
    accountInfo,
    reciever,
    staff
})

export default rootReducer