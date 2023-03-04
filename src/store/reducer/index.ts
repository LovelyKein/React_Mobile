import { combineReducers } from 'redux'

// 模块
import userReducer from './modules/user'

const reducer = combineReducers({
  user: userReducer
})

export default reducer