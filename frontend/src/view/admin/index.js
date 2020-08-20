import React from 'react'
import {Tabs} from "antd"
import {UserAddOutlined, MoneyCollectOutlined} from '@ant-design/icons'
import StaffCreating from './StaffCreating'
import ListStaff from './ListStaff'

const {TabPane} = Tabs
const CREATE_STAFF = 'CREATE_STAFF'
const STAFF_LIST = 'STAFF_LIST'

const AdminService = props => {
    return (
        <Tabs animated
              style={{
                  margin: '10px'
              }}>
            <TabPane tab={<span>Tạo tài khoản nhân viên<UserAddOutlined/></span>}
                     key={CREATE_STAFF}>
                <StaffCreating/>
            </TabPane>
            {/* <TabPane tab={
                <span>Danh sách nhân viên<MoneyCollectOutlined/></span>}
                     key={STAFF_LIST}>
                <ListStaff/>
            </TabPane> */}
        </Tabs>
    )
}

export default AdminService