import {Button, Form, Input} from "antd";
import React from 'react'
import {connect} from 'react-redux'
import {userAction} from '../../action/user'

const layout = {
    labelCol: {span: 9},
    wrapperCol: {span: 15},
}


const LoginTab = props => {
    const onFinish = value => {
        props.login(value)
    }

    return (
        <Form
            {...layout}
            scrollToFirstError={true}
            onFinish={onFinish}
        >
            <Form.Item
                label='Tên đăng nhập'
                name='username'
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập tên đăng nhập!'
                    },
                    {
                        type: "email",
                        message: 'Tên đăng nhập phải là email!'
                    }
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label='Mật khẩu'
                name='password'
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập mật khẩu!'
                    },
                    {
                        min: 6,
                        message: 'Mật khẩu dài ít nhất 6 kí tự!'
                    }
                ]}
            >
                <Input.Password/>
            </Form.Item>

            <Form.Item wrapperCol={{...layout.wrapperCol, offset: 9}}>
                <Button type='primary' htmlType='submit'>Submit</Button>
            </Form.Item>
        </Form>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        login: user => dispatch(userAction.login(user.username, user.password))
    }
}

export default connect(null, mapDispatchToProps)(LoginTab)