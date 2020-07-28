import React from 'react'
import {Tabs} from "antd"
import {SendOutlined, SaveOutlined} from '@ant-design/icons'
import MoveMoney from "./movemoney";
import ReciverList from "./recieverlist"
import * as constants from "./const"

const {TabPane} = Tabs
const Service = props => {

    return (
        <Tabs animated
              style={{
                  margin: '10px'
              }}>
            <TabPane tab={<span>Chuyển khoản <SendOutlined/></span>}
                     key={constants.MOVE_MONEY}>
                <MoveMoney/>
            </TabPane>
            <TabPane tab={<span>Danh sách gợi nhớ <SaveOutlined/></span>}
                     key={constants.MOVE_MONEY_LIST}>
                <ReciverList/>
            </TabPane>
        </Tabs>
    )
}

export default Service