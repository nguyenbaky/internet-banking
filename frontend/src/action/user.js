import {message} from "antd";
import {userConstants} from "../constant/user";
import {userService} from "../service/user";
import history from '../util/history/index'

const login = (username, password) => {
    const request = user => {
        message.loading('Vui lòng chờ ...', 0)
        return {type: userConstants.LOGIN_REQUEST, user}
    }

    const success = user => {
        message.destroy()
        message.success(user.message)
        let {data} = user
        return {type: userConstants.LOGIN_SUCCESS, data}
    }

    const failure = err => {
        message.destroy()
        return {type: userConstants.LOGIN_FAILURE, err}
    }

    return dispatch => {
        dispatch(request({username}))
        userService.login(username, password)
            .then(user => {
                dispatch(success(user))
                history.push('/')
            })
            .catch(err => {
                dispatch(failure(err.toString()))
                message.error(err.toString())
            })
    }
}

const logout = _ => {
    userService.logout()
    return {type: userConstants.LOGOUT}
}

export const userAction = {
    login,
    logout
}
