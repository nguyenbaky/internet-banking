import {Modal, Form, Input, InputNumber} from "antd";
import {accountAction} from "../../action/account";
import React from 'react'
import {connect} from 'react-redux'


const layout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
}

const CreateSavingAccount = props => {
    const inputNumberParser = value => value.replace('₫', '')
    const inputNumberFormatter = value => `${value}₫`

    const formSubmit = value => {
        props.formSubmit(value.name, value.balance)
        props.onClose()
    }

    return (
        <Modal title='Tạo tài khoản tiết kiệm'
               okButtonProps={{
                   form: 'createSavingAccountForm',
                   key: 'submit',
                   htmlType: 'submit'
               }}
               onCancel={props.onClose}
               closable={false}
               visible={props.visible}
               okText='Tạo'
               cancelText='Hủy'>
            <Form {...layout}
                  id='createSavingAccountForm'
                  onFinish={formSubmit}>
                <Form.Item name='name'
                           label='Tên'
                           rules={[
                               {
                                   required: true,
                                   message: 'Vui lòng nhập tên khoản tiết kiệm',
                               }
                           ]}>
                    <Input placeholder='Tên khoản tiết kiệm'/>
                </Form.Item>
                <Form.Item name='balance'
                           label='Số dư'
                           initialValue={0}
                           rules={[
                               {
                                   required: true,
                                   message: 'Vui lòng nhập số dư',
                               },
                               {
                                   type: 'number',
                                   message: 'Vui lòng nhập số, không nhập chữ',
                               },
                           ]}>
                    <InputNumber min={0}
                                 style={{width: '100%'}}
                                 decimalSeparator=','
                                 step={10000}
                                 parser={inputNumberParser}
                                 formatter={inputNumberFormatter}/>
                </Form.Item>
            </Form>
        </Modal>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        formSubmit: (name, balance) =>
            dispatch(accountAction.createSavingAccount(name, balance))
    }
}

export default connect(null, mapDispatchToProps)(CreateSavingAccount)