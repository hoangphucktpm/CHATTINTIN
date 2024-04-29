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

  reply: {
    show: false,
    data: null,
  },

  forward: {
    show: false,
    data: null,
  },

  isLoading: false,

  drawerModal: {
    show: false,
    data: null,
    selection: null,
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
    setReply: (state, action) => {
      state.reply = action.payload;
    },
    setForward: (state, action) => {
      state.forward = action.payload;
    },
    setLoadingUpload: (state, action) => {
      state.isLoading = action.payload;
    },
    setDrawerModal: (state, action) => {
      state.drawerModal = action.payload;
    },
  },
});

export const {
  setChatList,
  setMessages,
  setPopup,
  updateMessages,
  setViewFullImage,
  setReply,
  setForward,
  setLoadingUpload,
  setDrawerModal,
} = chatSlice.actions;
export default chatSlice.reducer;
