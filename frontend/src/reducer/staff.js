import {staffConstants} from "../constant/staff";

export const staff = (state = [], action) => {
    switch (action.type) {
        case staffConstants.GET_RECIEVER_SUCCESS:
            return action.data
        case staffConstants.GET_RECIEVER_FAILURE:
            return []
        default:
            return state
    }
}