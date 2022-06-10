import { configureStore } from "@reduxjs/toolkit";

import loginReducer from "./loginSlice";
import modalReducer from "./modalSlice";

export const store = configureStore({
  reducer: { modal: modalReducer, auth: loginReducer },
});
