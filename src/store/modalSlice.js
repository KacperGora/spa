import { createSlice } from "@reduxjs/toolkit";
const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isVisible: false,
    service : '45'
  },
  reducers: {
    modalToggle(state) {
      state.isVisible = !state.isVisible;
      state.service = '45'
    },
  },
});
export const modalActions = modalSlice.actions;
export default modalSlice.reducer
