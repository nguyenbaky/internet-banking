import React from 'react'
import {Form,Input,Button} from 'antd'
import { accountAction } from '../../action/account'
import {connect} from 'react-redux'

const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 8},
    },
}

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
}

const {Item} = Form


const ChangePassword = props => {
    const [form] = Form.useForm()

    const onFinish = values => {
        if(values.newPassword !== values.confirm){
            alert("password not match ")
            return;
        }
        props.changePassword()
        console.log('Received values of form: ', values);
    }

    return <Form form={form} {...formItemLayout} 
                style={{margin:"10px"}} 
                onFinish={onFinish}>
        <Item name='oldPassword' 
              label='Password cũ' 
              rules={[{required:true,message:"Nhập password cũ"}]}>
            <Input.Password placeholder='Nhập password cũ'/>
        </Item>
        <Item name='newPassword' 
              label='Password mới' 
              rules={[{required:true,message:"Nhập password mới"}]}>
            <Input.Password placeholder='Nhập password mới'/>
        </Item>
        <Item name='confirm' 
              label='Nhập lại password' 
              rules={[{required:true,message:"Nhập password mới"}]}>
            <Input.Password placeholder='Nhập password mới'/>
        </Item>
        <Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
        </Item>
    </Form>
}


const mapDispatchToProps = dispatch => {
    return {
        changePassword: _ => dispatch(accountAction.changePassword())
    }
}

export default connect(null,mapDispatchToProps)(ChangePassword)