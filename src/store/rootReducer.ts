import { combineReducers } from '@reduxjs/toolkit'
import user from './user/userSlice'
import meeting from './meeting/meetingSlice'

const rootReducer = combineReducers({ user, meeting })

export default rootReducer
