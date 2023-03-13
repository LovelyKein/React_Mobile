import { combineReducers } from 'redux'

// 模块
import userReducer from './modules/user'

// types
import { InitialUser } from './modules/user'

const reducer = combineReducers({
  user: userReducer
})

export default reducer

// 类型
export interface reducerType {
  user: InitialUser;
}