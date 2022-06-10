import { createSlice } from "@reduxjs/toolkit";
const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLogged: false,
  },
  reducers: {
    login(state) {
      state.isLogged = true;
    },
    logout(state) {
      state.isLogged = false;
    },
  },
});

export const loginActions = loginSlice.actions
export default loginSlice.reducer