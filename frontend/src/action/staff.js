import {staffService} from '../service/staff'
import {staffConstants} from '../constant/staff'
import { message } from 'antd'

const getListStaff = _ => dispatch => {
    staffService.getListStaff()
        .then(res => {
            const {data} = res
            console.log(data)
            dispatch({
                type:staffConstants.GET_STAFF_SUCCESS,
                data
            })
        }).catch(_ => {
            dispatch({
                type:staffConstants.GET_STAFF_FAILURE
            })
        })
}

const deleteStaff = staffID => dispatch => {
    staffService.deleteStaff(staffID)
    .then(res => {
        message.success(res.message)
        dispatch(getListStaff)
    }).catch(error => {
        message.error(error)
    })
}

export const staffAction = {
    getListStaff,
    deleteStaff
}