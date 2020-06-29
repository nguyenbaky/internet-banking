import {message} from "antd";
import Dashboard from "./view/dashboard";
import React from 'react'
import {connect} from "react-redux";
import {Router, Route, Switch} from 'react-router-dom'
import history from './util/history/index'
import 'antd/dist/antd.css'
import './util/style/index.css'
import Login from './view/login/index'
import {PrivateRoute} from './component/PrivateRoute'

message.config({
    duration: 2,
});

const App = props => (
    <Router history={history}>
        <Switch>
            <Route exact path='/login' component={Login}/>
            <PrivateRoute path='/'
                          authentication={props.auth}
                          component={Dashboard}/>
        </Switch>
    </Router>
)

const mapStateToProps = state => ({
    auth: state.authentication
})

export default connect(mapStateToProps)(App)