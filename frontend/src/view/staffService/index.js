import React from 'react'
import {Tabs} from "antd"
import {UserAddOutlined, MoneyCollectOutlined} from '@ant-design/icons'
import UserCreating from "./usercreating";
import MoveMoney from "./movemoney";

const {TabPane} = Tabs
const MOVE_MONEY = 'MOVE_MONEY'
const MOVE_MONEY_LIST = 'MOVE_MONEY_LIST'

const StaffService = props => {

    return (
        <Tabs animated
              style={{
                  margin: '10px'
              }}>
            <TabPane tab={<span>Tạo tài khoản <UserAddOutlined/></span>}
                     key={MOVE_MONEY}>
                <UserCreating/>
            </TabPane>
            <TabPane tab={
                <span>Nạp tiền vào tài khoản <MoneyCollectOutlined/></span>}
                     key={MOVE_MONEY_LIST}>
                <MoveMoney/>
            </TabPane>
        </Tabs>
    )
}

export default StaffService