import { configureStore } from '@reduxjs/toolkit'
import { baseApi } from '../../shared/api'

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(baseApi.middleware)
    }
})