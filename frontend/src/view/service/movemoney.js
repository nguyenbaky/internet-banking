import {Form, Input, Select, InputNumber, Checkbox} from "antd";
import React from 'react'
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
const {Option} = Select
const inputNumberParser = value => value.replace('₫', '')
const inputNumberFormatter = value => `${value}₫`

const MoveMoney = props => {
    const [form] = Form.useForm()

    return (
        <Form form={form}
              {...formItemLayout}>
            <Item name='name'
                  label='Tên người nhận'>
                <Input disabled/>
            </Item>
            <Item name='bankCode'
                  label='Mã ngân hàng'>
                <Select>
                    <Option value="1">Option 1</Option>
                    <Option value="2">Option 2</Option>
                    <Option value="3">Option 3</Option>
                </Select>
            </Item>
            <Item name='accountNumber'
                  label='Số tài khoản người nhận'
                  rules={[
                      {
                          required: true,
                          message: 'Số tài khoản người nhận không được bỏ trống'
                      }
                  ]}>
                <Input/>
            </Item>
            <Item label='Số tiền' style={{marginBottom: 0}}>
                <Item name='amount'
                      initialValue={0}
                      rules={[
                          {
                              required: true,
                              message: 'Số tiền không được bỏ trống'
                          },
                          {
                              type: 'number',
                              message: 'Vui lòng nhập số, không nhập chữ',
                          },
                      ]}
                      style={{
                          display: 'inline-block',
                          width: 'calc(40% - 12px)'
                      }}>
                    <InputNumber step={10000}
                                 parser={inputNumberParser}
                                 formatter={inputNumberFormatter}
                                 max={props.account.balance}
                                 min={10000}
                                 style={{width: '150px'}}/>
                </Item>
                <Item name='recipientCharge'
                      label='Người nhận chịu phí'
                      style={{
                          display: 'inline-block',
                          width: 'calc(60% - 12px)'
                      }}>
                    <Checkbox/>
                </Item>
            </Item>
            <Item name='message'
                  label='Lời nhắn'>
                <Input
                    placeholder='Gửi lời nhắn đến người nhận (không bắt buôc)'/>
            </Item>
        </Form>
    )
}

const mapStateToProps = state => {
    return {
        account: state.account,
    }
}

export default connect(mapStateToProps)(MoveMoney)