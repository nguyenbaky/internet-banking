import React from 'react'
import ReactDom from 'react-dom'
import App from './app'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {hot} from 'react-hot-loader'
import {createStore, applyMiddleware, compose} from 'redux'
import {createLogger} from "redux-logger"
import reducer from './reducer'

const loggerMiddleware = createLogger()

const middleware = [thunk, loggerMiddleware]
let store = null
if (process.env.REACT_APP_ENV !== 'production') {
    hot(module)(App)
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    const enhancer = composeEnhancers(
        applyMiddleware(...middleware)
    )

    store = createStore(reducer, enhancer)
    if (module.hot) {
        module.hot.accept('./reducer', _ => {
            store.replaceReducer(reducer)
        })
    }
} else {
    store = createStore(reducer, applyMiddleware(...middleware));
}

ReactDom.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root')
)