import {accountAction} from "../../action/account";
import React, {useState} from 'react'
import {Button, Modal, Form, Input, InputNumber, Slider, Row, Col} from "antd"
import {connect} from 'react-redux'
import {DeleteOutlined, EditOutlined} from '@ant-design/icons'

const formLayout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
}

const PopoverSavingAccount = props => {
    const [visibleUpdatingModal, setVisibleUpdatingModal] = useState(false)
    const [deltaValue, setDeltaValue] = useState(0)
    const [form] = Form.useForm()

    const onBtnDeleteClick = _ => {
        props.del(props.savingAccount.id)
    }

    const onBtnUpdateClick = _ => {
        props.setHoverVisible(false)
        form.resetFields()
        setVisibleUpdatingModal(true)
    }

    const deltaValueOnchange = value => {
        form.setFieldsValue({
            ['deltaBalance']: value
        })
        setDeltaValue(value)
    }

    const formSubmit = value => {
        props.update(props.savingAccount.id, value.name, value.deltaBalance)
        setVisibleUpdatingModal(false)
    }

    const onCloseUpdatingModal = _ => {
        setVisibleUpdatingModal(false)
    }

    return <div>
        <Button type='primary'
                icon={<DeleteOutlined/>}
                onClick={onBtnDeleteClick}
                style={{
                    margin: '0px 5px'
                }}
                danger>Xóa</Button>
        <Button type='primary'
                onClick={onBtnUpdateClick}
                icon={<EditOutlined/>}
                style={{
                    margin: '0px 5px'
                }}>Cập nhật</Button>

        <Modal title='Cập nhật ví'
               visible={visibleUpdatingModal}
               onCancel={onCloseUpdatingModal}
               closeable={false}
               okText='Cập nhật'
               cancelText='Hủy'
               okButtonProps={{
                   form: 'updateSavingAccountForm',
                   key: 'submit',
                   htmlType: 'submit'
               }}>
            <Form form={form}
                  id='updateSavingAccountForm'
                  onFinish={formSubmit}
                  {...formLayout}>
                <Form.Item name='name'
                           label='Tên'
                           initialValue={props.savingAccount.name}
                           rules={[
                               {
                                   required: true,
                                   message: 'Vui lòng nhập tên khoản tiết kiệm',
                               }
                           ]}>
                    <Input placeholder='Tên khoản tiết kiệm'/>
                </Form.Item>
                <Form.Item name='deltaBalance'
                           label='Biến động số dư'
                           initialValue={0}
                           value={deltaValue}
                           rules={[
                               {
                                   required: true,
                                   message: 'Vui lòng nhập số dư',
                               },
                           ]}>
                    <Input.Group>
                        <Row gutter={[5, 0]}>
                            <Col span={17}>
                                <Slider
                                    min={-props.balance}
                                    step={10000}
                                    max={props.mainAccountBalance}
                                    onChange={deltaValueOnchange}
                                    value={typeof deltaValue === 'number' ? deltaValue : 0}
                                />
                            </Col>
                            <Col span={4}>
                                <InputNumber min={-props.balance}
                                             step={10000}
                                             max={props.mainAccountBalance}
                                             onChange={deltaValueOnchange}
                                             value={deltaValue}/>
                            </Col>
                        </Row>
                    </Input.Group>
                </Form.Item>
            </Form>
        </Modal>
    </div>
}

const mapDispatchToProps = dispatch => {
    return {
        del: savingAccountID =>
            dispatch(accountAction.delSavingAccount(savingAccountID)),
        update: (savingAccountID, name, delBalance) =>
            dispatch(accountAction.updateSavingAccount(savingAccountID, name, delBalance))
    }
}

export default connect(null, mapDispatchToProps)(PopoverSavingAccount)