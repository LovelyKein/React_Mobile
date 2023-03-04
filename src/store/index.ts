import { legacy_createStore, applyMiddleware } from "redux"
import reduxThunk from 'redux-thunk'
import reduxPromise from 'redux-promise'

import reducer from './reducer/index'

const middleware = [reduxThunk, reduxPromise] // 中间件，用于异步

const store = legacy_createStore(reducer, applyMiddleware(...middleware))
export default store