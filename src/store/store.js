import { configureStore } from "@reduxjs/toolkit";
import userReducer from './usersSlice'
import loginReducer from "./loginSlice";
import modalReducer from "./modalSlice";
import calendarReducer from "./calendarSlice";


export const store = configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer,
    auth: loginReducer,
    calendar: calendarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
