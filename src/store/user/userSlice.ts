import { createSlice } from '@reduxjs/toolkit'

interface IState {
    name: string
    age: number
    email: string
}

const initialState = {
    name: 'admin',
    age: 25,
    email: 'admin@gmail.com',
}

export const user = createSlice({
    name: 'user',
    initialState: initialState as IState,
    reducers: {
        setUserName: (state, { payload: { name, age, email } }) => {
            state.name = name
            state.age = age
            state.email = email
        },
        setInit: (state) => {
            return initialState
        },
    },
})

export const { setUserName, setInit } = user.actions

export default user.reducer
