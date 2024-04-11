import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatList: [], // [{message: 'Hello', fromSelf: true}]
  messages: [],
  popup: {
    show: false,
    data: null,
  },
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
    setPopup: (state, action) => {
      state.popup = action.payload;
    },
    updateMessages: (state, action) => {
      state.messages.unshift(action.payload);
    },
  },
});

export const { setChatList, setMessages, setPopup, updateMessages } =
  chatSlice.actions;
export default chatSlice.reducer;
