import {recieverConstants} from "../constant/reciever";

export const reciever = (state = [], action) => {
    switch (action.type) {
        case recieverConstants.GET_RECIEVER_SUCCESS:
            return action.data
        case recieverConstants.GET_RECIEVER_FAILURE:
            return []
        default:
            return state
    }
}