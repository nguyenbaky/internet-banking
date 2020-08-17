import React from 'react'
import {Tabs} from "antd"
import {UserAddOutlined, MoneyCollectOutlined} from '@ant-design/icons'
import UserCreating from "./usercreating";
import MoveMoney from "./movemoney";

const {TabPane} = Tabs
const CREATE_USER = 'CREATE_USER'
const MOVE_MONEY = 'MOVE_MONEY'

const StaffService = props => {

    return (
        <Tabs animated
              style={{
                  margin: '10px'
              }}>
            <TabPane tab={<span>Tạo tài khoản <UserAddOutlined/></span>}
                     key={CREATE_USER}>
                <UserCreating/>
            </TabPane>
            <TabPane tab={
                <span>Nạp tiền vào tài khoản <MoneyCollectOutlined/></span>}
                     key={MOVE_MONEY}>
                <MoveMoney/>
            </TabPane>
        </Tabs>
    )
}

export default StaffService