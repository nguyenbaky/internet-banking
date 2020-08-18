  
import {Form,Input,AutoComplete,Select,InputNumber,Checkbox,Button,Modal} from "antd";
import {accountService} from "../../service/account";
import React, {useState, useEffect} from 'react'
import {connect,useSelector} from 'react-redux'
import {transactionAction} from "../../action/transaction"
import {recieverAction} from "../../action/reciever";
import {userAction} from '../../action/user'

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
    const [isValid, setIsValid] = useState(false)
    const [visible,setVisible] = useState(false)
    const [otp,setOtp] = useState()
    const reciever = useSelector(state => state.reciever)
    const [transaction,setTransaction] = useState({})
    const [recipientCharge,setRecipientCharge] = useState()
    const [saveRecipient,setSaveRecipient] = useState()
    let delayTimer

    useEffect(() => {
        console.log(`MoveMoney props `,props)
        props.getReciever()
        console.log(`MoveMoney props after getReciever`,reciever)
    }, [])

    const accountNumberOnchange = value => {
        if (!value || value.length < 5) {
            return
        }

        clearTimeout(delayTimer)
        delayTimer = setTimeout(_ => {
            console.log('MoveMoney accountNumberOnchange value: ',value)
            accountService.getAccountInfo(value)
                .then(res => {
                    const userInfo = res.data
                    console.log(`MoveMoney accountNumberOnchange userInfo `,userInfo)
                    form.setFieldsValue({
                        name: userInfo.name,
                    })
                    setIsValid(true)
                })
                .catch(_ => {
                    form.setFieldsValue({
                        name: '',
                    })
                    setIsValid(false)
                })
        }, 500)
    }

    const showModal = () => {
        setVisible(true)
    }

    const handleOk = async() =>{
        // compare OTP
        const check = await userAction.checkOTP(otp)
        console.log(`check` ,check)
        console.log('transaction ',transaction)
        console.log('recipientCharge ',recipientCharge)
        console.log('saveRecipient ',saveRecipient)
        if(check){
            props.createTransaction(transaction, recipientCharge,
                saveRecipient)
        }else{
            alert(`Ma4 OTP không chính xác`)
        }
        setVisible(false)
        
    }

    const handleCancel =() => {
        setVisible(false)
    }

    const onFinish = value => {
        console.log(`onFinish `,value)
        const t = {
            receiver_account_number: value.accountNumber,
            receiver_bank_code: value.bankCode,
            sender_account_number: props.account.account_number,
            sender_bank_code: 'BANK',
            amount: value.amount,
            message: value.message
        }
        setTransaction(t)
        setSaveRecipient(value.saveRecipient)
        setRecipientCharge(value.recipientCharge)
        
        //send Email
        userAction.sendOTP()
        showModal()

        form.resetFields()
        setIsValid(true)
        return
    }

    const accountNumberOption = reciever.map(reciever => ({
        value: reciever.reciever_account_number,
        label: `${reciever.reciever_account_number} - ${reciever.bank_code} - ${reciever.reciever_name}`,
        original: reciever,
    })) 

    const accountNumberOnSelect = (value,option) => {
        console.log(`MoveMoney accountNumberOnSelect `,value)
        // form.setFieldsValue({
        //     name: option.current.original.reciever_name,
        //     bankCode: option.current.original.bank_code,
        // })
        setIsValid(true)
    }

    return (
        <>
            <Form form={form}
                scrollToFirstError={true}
                onFinish={onFinish}
                {...formItemLayout}>
                <Item name='name'
                    initialValue={``}
                    label='Tên người nhận'>
                    <Input disabled/>
                </Item>
                <Item name='bankCode'
                    initialValue='BANK'
                    label='Mã ngân hàng'>
                    <Select>
                        <Option value="BANK"> Bank</Option>
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
                    <AutoComplete onChange={accountNumberOnchange}
                                onSelect={accountNumberOnSelect}
                                options={accountNumberOption}
                                allowClear>
                        <Input/>
                    </AutoComplete>
                </Item>
                <Item name='amount'
                    label='Số tiền'
                    initialValue={10000}
                    rules={[
                        {
                            required: true,
                            message: 'Số tiền không được bỏ trống'
                        },
                        {
                            type: 'number',
                            message: 'Vui lòng nhập số, không nhập chữ',
                        },
                        {
                            validator: (_, value) => {
                                if (value >= 10000) {
                                    return Promise.resolve()
                                }

                                return Promise.reject('Số tiền chuyển khoản phải lớn hơn 10.000₫')
                            }
                        }
                    ]}>
                    <InputNumber step={10000}
                                parser={inputNumberParser}
                                formatter={inputNumberFormatter}
                                max={props.account.balance}
                                min={10000}
                                style={{width: '150px'}}/>
                </Item>
                <Item name='saveRecipient'
                    valuePropName='checked'
                    initialValue={false}
                    label='Lưu thông tin người nhận'>
                    <Checkbox/>
                </Item>
                <Item name='message'
                    initialValue=''
                    label='Lời nhắn'>
                    <Input allowClear
                        placeholder='Gửi lời nhắn đến người nhận (không bắt buôc)'/>
                </Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary"
                            disabled={!isValid}
                            htmlType="submit">
                        Gửi
                    </Button>
                </Form.Item>
            </Form>
            <Modal
                title="Xác thực OTP"
                visible={visible}
                style={{width:50}}
                onOk={handleOk}
                onCancel={handleCancel}
                >
                <Input style={{ width: '20%' }} value ={otp} onChange ={(e) => {setOtp(e.target.value)}}/>
                <p style={{marginTop:30}}>Mã OTP đã được gửi vào email của bạn</p>
            </Modal>
        </>
    )
}

const mapStateToProps = state => {
    return {
        account: state.account,
        accountInfo: state.accountInfo,
        reciever: state.reciever,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createTransaction: (transaction, recipientCharge, saveRecipient) =>
            dispatch(transactionAction.createTransaction(transaction, recipientCharge,
                saveRecipient)),
        getReciever: _ => dispatch(recieverAction.getReciever())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MoveMoney)