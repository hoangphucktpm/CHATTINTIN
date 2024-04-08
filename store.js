import { configureStore } from '@reduxjs/toolkit'
import authSclice from './src/redux/authSclice'
import chatSlice from './src/redux/chatSlice'

export const store = configureStore({
    reducer: {
        auth: authSclice,
        chat: chatSlice
    }
})