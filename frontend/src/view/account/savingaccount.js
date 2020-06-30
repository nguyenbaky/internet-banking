import {Card, Popover, Statistic} from "antd";
import React, {useState} from 'react'
import {connect} from 'react-redux'
import PopoverSavingAccount from "./popoversavingaccount";

const style = {
    grid: {
        width: '250px',
        minHeight: '150px',
        padding: '10px'
    },
}

const SavingAccount = props => {
    const [visible, setVisible] = useState(false)

    const onVisibleChange = value => {
        setVisible(value)
    }

    const {account} = props
    const savingAccount = account.saving_account[props.index]
    return (
        <Popover trigger='hover'
                 visible={visible}
                 onVisibleChange={onVisibleChange}
                 content={
                     <PopoverSavingAccount balance={savingAccount.balance}
                                           setHoverVisible={onVisibleChange}
                                           mainAccountBalance={account.balance}
                                           savingAccount={savingAccount}/>}>
            <Card.Grid style={style.grid}
                       hoverable>
                <Statistic
                    title='Tên'
                    groupSeparator=''
                    value={savingAccount.name}
                />
                <Statistic
                    title='Số dư'
                    valueStyle={{color: '#3f8600'}}
                    value={savingAccount.balance}
                    suffix='₫'
                />
            </Card.Grid>
        </Popover>
    )
}

const mapStateToProps = state => {
    return {
        account: state.account
    }
}

export default connect(mapStateToProps)(SavingAccount)