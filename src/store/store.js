import { createSlice, configureStore } from "@reduxjs/toolkit";
import React from "react";

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        isLogged: false
    },
    reducers: {
        login(state) {
            state.isLogged = true
        },
        logout(state) {
            state.isLogged = false
        }
    }
})

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



export const store = configureStore({
  reducer: { modal : modalSlice.reducer, auth: loginSlice.reducer},
})


  

export const modalActions = modalSlice.actions
export const loginActions = loginSlice.actions