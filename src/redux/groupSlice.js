import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  groupDetails: null,
  members: [],
};

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    setGroupDetails: (state, action) => {
      state.groupDetails = action.payload;
    },
    setMemberGroups: (state, action) => {
      state.members = action.payload;
    },
  },
});

export const { setGroupDetails, setMemberGroups } = groupSlice.actions;
export default groupSlice.reducer;
