import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import {LoadScript} from "@react-google-maps/api";
const GOOGLE_APP_KEY = 'AIzaSyDVFOtkV_zQmarBaru6SQ1qozIxAe5G66w';
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <LoadScript googleMapsApiKey={GOOGLE_APP_KEY}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LoadScript>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
