import {combineReducers} from "redux"
import {authentication} from "./authentication"
import {account,accountInfo} from "./account";
import {reciever} from './reciever'

const rootReducer = combineReducers({
    authentication,
    account,
    accountInfo,
    reciever
})

export default rootReducer