import {recieverAction} from "../../action/reciever";
import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Table, Button, Modal, Form} from "antd";
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';

const formLayout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
}

const RecieverList = props => {
    const [visibleUpdatingModal, setVisibleUpdatingModal] = useState(false)

    const columns = [
        {
            title: '#',
            key: 'index',
            dataIndex: 'index',
        },
        {
            title: 'Tên',
            key: 'name',
            dataIndex: 'name',
        },
        {
            title: 'Ngân hàng',
            key: 'bank',
            dataIndex: 'bank',
        },
        {
            title: 'Số tài khoản',
            key: 'accountNumber',
            dataIndex: 'accountNumber',
        },
        {
            key: 'action',
            render: reciever => <div>
                <Button danger
                        size='small'
                        style={{margin: '5px'}}
                        onClick={_ => {
                            props.deleteReciever(reciever.accountNumber)
                        }}
                        icon={<DeleteOutlined/>}>Xóa</Button>
                {/* <Button type='primary'
                        size='small'
                        icon={<EditOutlined/>}
                        onClick={_ => {
                            setVisibleUpdatingModal(true)
                        }}
                        style={{margin: '5px'}}>Cập nhật</Button> */}
            </div>
        }
    ]

    const dataSource = props.reciever.map((reciever, index) => ({
        key: index,
        index: index,
        name: reciever.reciever_name,
        bank: reciever.bank_code,
        accountNumber: reciever.reciever_account_number,
    }))

    const onCloseUpdatingModal = _ => {
        setVisibleUpdatingModal(false)
    }

    return <div>
        <Table dataSource={dataSource}
               tableLayout='auto'
               columns={columns}/>
        <Modal title='Cập nhật bạn'
               closable={false}
               okText='Lưu'
               cancelText='Hủy'
               okButtonProps={{
                   form: 'updateRecieverForm',
                   key: 'submit',
                   htmlType: 'submit'
               }}
               onCancel={onCloseUpdatingModal}
               visible={visibleUpdatingModal}>
            <Form id='updateRecieverForm'>

            </Form>
        </Modal>
    </div>
}

const mapStateToProps = state => {
    return {
        reciever: state.reciever,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getReciever: _ => dispatch(recieverAction.getReciever()),
        deleteReciever: recieverAccountNumber => dispatch(
            recieverAction.deleteReciever(recieverAccountNumber))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RecieverList)