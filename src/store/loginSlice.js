import { createSlice } from "@reduxjs/toolkit";
const loginSlice = createSlice({
  name: "login",
  initialState: {
    isLogged: false,
    admin: false
  },
  reducers: {
    login(state) {
      state.isLogged = true;
      
    },
    logout(state) {
      state.isLogged = false;
    },
    admin(state, action){
      state.admin = action.payload
    }
  },
});

export const loginActions = loginSlice.actions
export default loginSlice.reducer