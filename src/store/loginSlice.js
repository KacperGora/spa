import { createSlice } from "@reduxjs/toolkit";
let initialToken = localStorage.getItem("token");
let token = initialToken;


const loginSlice = createSlice({
  name: "login",
  initialState: {
    token: initialToken,
    isLogged: !!token,
    admin: false,
    hasError: false,
  },

  reducers: {
    login(state, action) {
      state.isLogged = true;
      state.token = action.payload;
    },
    logout(state) {
      state.isLogged = false;
      state.admin = false
      state.token = ''
    },
    admin(state, action) {
      state.admin = action.payload;
    },
    setHasError(state, action) {
      state.hasError = action.payload;
    },
  },
});

export const loginActions = loginSlice.actions;
export default loginSlice.reducer;
