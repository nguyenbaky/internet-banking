import {message} from "antd";
import {recieverService} from "../service/reciever";
import {recieverConstants} from "../contstant/reciever";

const getReciever = _ => dispatch => {
    recieverService.getReciever()
        .then(res => {
            const {data} = res
            dispatch({
                type: recieverConstants.GET_reciever_SUCCESS,
                data
            })
        })
        .catch(_ => {
            dispatch({
                type: recieverConstants.GET_reciever_FAILURE,
            })
        })
}

const createReciever = reciever => dispatch => {
    recieverService.createReciever(reciever)
        .then(res => {
            message.success(res.message)
            dispatch(getReciever())
        })
        .catch(err => {
            message.error(err)
        })
}

const deleteReciever = recieverAccountNumber => dispatch => {
    recieverService.deleteReciever(recieverAccountNumber)
        .then(res => {
            message.success(res.message)
            dispatch(getReciever())
        })
        .catch(err => {
            message.error(err)
        })
}

export const recieverAction = {
    getReciever,
    createReciever,
    deleteReciever,
}