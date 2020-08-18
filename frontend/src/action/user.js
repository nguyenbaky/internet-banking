import {userConstants} from "../constant/user";
import {userService} from "../service/user";
import history from '../util/history/index'
import {message} from "antd";

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

const register = (user,role) => {
    return dispatch => {
        userService.register(user,role)
            .then(res => {
                message.success(res.message)
            })
            .catch(err => {
                message.error(err)
            })
    }
}

const logout = _ => {
    userService.logout()
    return {type: userConstants.LOGOUT}
}

const sendOTP = () => {
    userService.sendOTP()
    .then(res => console.log(`action sendOTP `,res))
    .catch(err => {
        message.err(err)
    })
}

const checkOTP = async(otp) => {
    let m = false
    await userService.checkOTP(otp).then( res => {
        m = res.message
        if(res.message) {
            message.success(res.message)
        }
        else message.err('Mã OTP không chính xác')
    }).catch(err => {
        message.error(err)
    })
    console.log('m ngoài ',m)
    return m
}

export const userAction = {
    login,
    logout,
    register,
    sendOTP,
    checkOTP
}
