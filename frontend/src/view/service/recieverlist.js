import {recieverAction} from "../../action/reciever";
import React from 'react'
import {connect} from 'react-redux'
import {Table, Button} from "antd";
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';

const RecieverList = props => {

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
                <Button type='primary'
                        size='small'
                        icon={<EditOutlined/>}
                        style={{margin: '5px'}}>Cập nhật</Button>
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

    return <Table dataSource={dataSource}
                  tableLayout='auto'
        //bordered
                  columns={columns}/>
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