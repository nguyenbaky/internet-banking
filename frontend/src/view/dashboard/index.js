import React, {useState} from 'react'
import {Layout, Menu, Button} from "antd";
import {connect} from 'react-redux'
import {
    WalletOutlined,
    LogoutOutlined,
    BankOutlined,
    SettingOutlined,
    SolutionOutlined
} from '@ant-design/icons'
import {accountAction} from "../../action/account";
import {userAction} from "../../action/user"
import Account from '../account/index'
import Service from "../service/index"
import Setting from '../setting/index'
import StaffService from "../staffService/index";

const {Content, Footer, Sider, Header} = Layout;

const WALLET_ITEM = 'wallet'
const SERVICE_ITEM = 'service'
const SETTING = 'setting'
const LOGOUT_ITEM = 'logout'
const STAFF_SERVICE_ITEM = 'staff_service_item'

const staffMenu = authentication => {
    console.log(`authentication `,authentication)
    if (!authentication || !authentication.user || !authentication.user.roles) {
        return null
    }

    const role = authentication.user.roles
    console.log(`role `,role)
    const exist = role.find(r => r.id === 2)
    if (exist === undefined) {
        return null
    }

    return <Menu.Item
        key={STAFF_SERVICE_ITEM}
        icon={<SolutionOutlined/>}
        style={{margin: 1}}>
        Quản lý
    </Menu.Item>
}

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
            case STAFF_SERVICE_ITEM:
            setContent(<StaffService/>)
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
                    {staffMenu(props.authentication)}
                    <Menu.Divider/>
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
        account: state.account,
        authentication: state.authentication,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: _ => dispatch(userAction.logout()),
        getAccount: _ => dispatch(accountAction.getAccounts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
