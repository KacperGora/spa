import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isVisible: false,
    
  },
  reducers: {
    modalToggle(state) {
      state.isVisible = !state.isVisible;
      
    },
  },
});
export const modalActions = modalSlice.actions;
export default modalSlice.reducer
