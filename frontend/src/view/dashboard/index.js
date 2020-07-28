import React, {useState} from 'react'
import {Layout, Menu, Button} from "antd";
import {connect} from 'react-redux'
import {
    WalletOutlined,
    LogoutOutlined,
    BankOutlined,
    SettingOutlined
} from '@ant-design/icons'
import {accountAction} from "../../action/account";
import {userAction} from "../../action/user"
import Account from '../account/index'
import Service from "../service/index"
import Setting from '../setting/index'

const {Content, Footer, Sider, Header} = Layout;

const WALLET_ITEM = 'wallet'
const SERVICE_ITEM = 'service'
const SETTING = 'setting'
const LOGOUT_ITEM = 'logout'


const Dashboard = props => {

    const [content, setContent] = useState(<Account/>)
    const onMenuSelect = obj => {
        const {key} = obj
        switch (key) {
            case WALLET_ITEM:
                setContent(<Account/>)
                break
            case  SERVICE_ITEM:
                setContent(<Service/>)
                break
            case SETTING:
                setContent(<Setting/>)
                break
            case LOGOUT_ITEM:
                props.logout()
        }
    }

    return (
        <Layout
            style={{
                height: '100vh',
                background: 'rgba(255, 255, 255, 1)',
            }}>
            <Sider
                breakpoint='lg'
                collapsible
                style={{
                    height: '100vh',
                    width: '100%',
                    //position: 'fixed',
                    left: 0,
                }}>
                <Menu theme='dark'
                      onSelect={onMenuSelect}
                      mode='inline'
                      defaultSelectedKeys={[WALLET_ITEM]}
                      style={{
                          height: '100vh',
                          width: '100%',

                      }}>
                    <div style={{height: '63px'}}/>
                    <Menu.Divider/>
                    <Menu.Item
                        key={WALLET_ITEM}
                        icon={<WalletOutlined/>}
                        style={{margin: 1}}>
                        Thông tin tài khoản
                    </Menu.Item>
                    <Menu.Divider/>
                    <Menu.Item
                        key={SERVICE_ITEM}
                        icon={<BankOutlined/>}
                        style={{margin: 1}}>
                        Tiện ích
                    </Menu.Item>
                    <Menu.Divider/>
                    <Menu.Item
                        key={SETTING}
                        icon={<SettingOutlined/>}
                        style={{margin: 1}}>
                        Setting
                    </Menu.Item>
                    <Menu.Divider/>
                    <Menu.Item
                        key={LOGOUT_ITEM}
                        icon={<LogoutOutlined/>}
                        style={{margin: 1}}>
                        Đăng xuất
                    </Menu.Item>
                    <Menu.Divider/>
                </Menu>
            </Sider>
            <Layout>
                <Content
                    style={{
                        margin: '24px 16px 0',
                        backgroundColor: '#fff',
                    }}>
                    {content}
                </Content>
                <Footer
                    className='text-center'>
                    BKBank ©2020 
                </Footer>
            </Layout>
        </Layout>
    )
}

const mapStateToProps = state => {
    return {
        account: state.account
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: _ => dispatch(userAction.logout()),
        getAccount: _ => dispatch(accountAction.getAccounts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
