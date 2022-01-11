import React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import rootReducer from './rootReducer'

const render = (
    ui,
    {
        // preloadedState,
        store = configureStore({
            reducer: rootReducer,
            middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware({ serializableCheck: false }),
            // preloadedState,
        }),
        ...renderOptions
    } = {}
) => {
    // eslint-disable-next-line react/prop-types
    const Wrapper = ({ children }) => {
        return <Provider store={store}>{children}</Provider>
    }
    rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
    return { store }
}

// re-export everything
export * from '@testing-library/react'
// override render method
export { render }
