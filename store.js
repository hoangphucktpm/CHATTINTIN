import { configureStore } from "@reduxjs/toolkit";
import authSclice from "./src/redux/authSclice";
import chatSlice from "./src/redux/chatSlice";
import conversationSlice from "./src/redux/conversationSlice";
import groupSlice from "./src/redux/groupSlice";
import appSlice from "./src/redux/appSlice";

export const store = configureStore({
  reducer: {
    auth: authSclice,
    chat: chatSlice,
    conversation: conversationSlice,
    group: groupSlice,
    app: appSlice,
  },
});
