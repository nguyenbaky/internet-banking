import React, {useState} from 'react'
import {connect} from 'react-redux'
import {Table, Button, Modal, Form} from "antd";
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {staffAction} from '../../action/staff'

const formLayout = {
    labelCol: {span: 8},
    wrapperCol: {span: 16},
}

const ListStaff = props => {
    const [visibleUpdatingModal, setVisibleUpdatingModal] = useState(false)

    const columns = [
        {
            title: '#',
            key: 'index',
            dataIndex: 'index',
        },
        {
            title: 'Tên nhân viên',
            key: 'name',
            dataIndex: 'name',
        },
        {
            title: 'Email',
            key: 'email',
            dataIndex: 'email',
        },
        {
            title: 'Số tài khoản',
            key: 'accountNumber',
            dataIndex: 'accountNumber',
        },
        {
            key: 'action',
            render: staff => <div>
                <Button danger
                        size='small'
                        style={{margin: '5px'}}
                        onClick={_ => {
                            props.deleteStaff(staff.id)
                        }}
                        icon={<DeleteOutlined/>}>Xóa</Button>
                <Button type='primary'
                        size='small'
                        icon={<EditOutlined/>}
                        onClick={_ => {
                            setVisibleUpdatingModal(true)
                        }}
                        style={{margin: '5px'}}>Cập nhật</Button>
            </div>
        }
    ]

    const dataSource = props.staff.map((staff, index) => ({
        key: index,
        index: index,
        name: staff.name,
        email: staff.email,
        account_number: staff.account_number
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
        deleteStaff: staffID => dispatch(
            staffAction.deleteStaff(staffID))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListStaff)