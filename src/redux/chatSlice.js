import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    chatList: [] // [{message: 'Hello', fromSelf: true}]
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setChatList: (state, action) => {
            state.chatList = state.chatList.concat(action.payload)
        }
    }
})

export const {setChatList} = chatSlice.actions
export default chatSlice.reducer