import React from 'react'
import {Route, Redirect} from 'react-router-dom'

export const PrivateRoute = ({component: Component, authentication, ...rest}) => (
    <Route
        {...rest}
        render={
            props => authentication.loggedIn
                ? <Component authentication={authentication} {...props}/>
                : <Redirect to={{pathname: '/login'}}/>
        }
    />
)