import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chatList: [], // [{message: 'Hello', fromSelf: true}]
  messages: [],
  popup: {
    show: false,
    data: null,
  },

  viewFullImage: {
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
    setViewFullImage: (state, action) => {
      state.viewFullImage = action.payload;
    },
  },
});

export const {
  setChatList,
  setMessages,
  setPopup,
  updateMessages,
  setViewFullImage,
} = chatSlice.actions;
export default chatSlice.reducer;
