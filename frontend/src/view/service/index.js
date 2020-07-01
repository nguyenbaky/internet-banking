import React from 'react'
import {Button, Tabs} from "antd"
import {SendOutlined, SaveOutlined} from '@ant-design/icons'
import MoveMoney from "./movemoney";

const {TabPane} = Tabs
const MOVE_MONEY = 'MOVE_MONEY'
const MOVE_MONEY_LIST = 'MOVE_MONEY_LIST'

const Service = props => {

    return (
        <Tabs animated
              style={{
                  margin: '10px'
              }}>
            <TabPane tab={<span>Chuyển khoản <SendOutlined/></span>}
                     key={MOVE_MONEY}>
                <MoveMoney/>
            </TabPane>
            <TabPane tab={<span>Danh sách gợi nhớ <SaveOutlined/></span>}
                     key={MOVE_MONEY_LIST}/>

        </Tabs>
    )
}

export default Service