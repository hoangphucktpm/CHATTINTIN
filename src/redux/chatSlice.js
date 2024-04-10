import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatList: [], // [{message: 'Hello', fromSelf: true}]
  messages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChatList: (state, action) => {
      state.chatList = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const { setChatList, setMessages } = chatSlice.actions;
export default chatSlice.reducer;
