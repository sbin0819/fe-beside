import { combineReducers } from '@reduxjs/toolkit'
import user from './user/userSlice'

const rootReducer = combineReducers({ user })

export default rootReducer
