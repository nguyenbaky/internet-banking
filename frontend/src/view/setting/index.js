import React from 'react';
import {Tabs} from "antd"
import GetAccount from "./getAccount"
import ChangePassword from "./changePassword"
import {SettingOutlined,UserOutlined } from "@ant-design/icons"
import * as constants from "./const"

const {TabPane} = Tabs

const Setting = props => {
    return (
        <Tabs animated
              style={{
                  margin: '10px'
              }}>
            <TabPane tab={<span>Thông tin tài khoản <UserOutlined /></span>}
                     key={constants.Get_USER}>
                <GetAccount/>
            </TabPane>
            <TabPane tab={<span>Đổi mật khẩu <SettingOutlined/></span>}
                     key={constants.CHANGE_PASSWORD}>
                <ChangePassword/>
            </TabPane>
        </Tabs>
    )
}

export default Setting