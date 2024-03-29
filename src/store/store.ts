import { HYDRATE, createWrapper, MakeStore } from 'next-redux-wrapper'
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import rootReducer from './rootReducer'

let initialRootState: RootState

const reducer = (state: any, action: any) => {
    if (action.type === HYDRATE) {
        if (state === initialRootState) {
            return {
                ...state,
                ...action.payload,
            }
        }
        return state
    }
    return rootReducer(state, action)
}

export const store = configureStore({
    reducer,
    // devTools: process.env.APP_ENV === 'production' ? false : true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
})

const initStore: MakeStore<any> = () => {
    initialRootState = store.getState()
    return store
}

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

declare module 'react-redux' {
    interface DefaultRootState extends RootState {}
}

export const wrapper = createWrapper(initStore)
