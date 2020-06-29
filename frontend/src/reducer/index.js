import {combineReducers} from "redux"
import {authentication} from "./authentication"
import {account} from "./account";

const rootReducer = combineReducers({
    authentication,
    account,
})

export default rootReducer