import React, {useState} from 'react'
import {Row, Card} from 'antd'
import LoginTab from './login.js'
import Register from "./register";

const LOGIN_TAB = 'login'
const REGISTER_TAB = 'register'

const tabList = [
    {
        key: LOGIN_TAB,
        tab: 'Đăng nhập'
    },
    {
        key: REGISTER_TAB,
        tab: 'Đăng kí'
    }
]

const contentList = {
    login: <LoginTab/>,
    register: <Register/>
}

const Login = props => {
    const [tab, setTab] = useState(LOGIN_TAB)

    const onTabChange = (key) => {
        setTab(key)
    }
    return (
        <Row justify='center' align='middle' className='full-screen'>
            <Card
                title='Bank'
                tabList={tabList}
                hoverable
                headStyle={{textAlign: 'center'}}
                onTabChange={key => onTabChange(key)}
            >
                {contentList[tab]}
            </Card>
        </Row>
    )
}

export default Login