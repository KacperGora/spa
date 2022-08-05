import React from "react";

import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { HashRouter } from "react-router-dom";
import { LoadScript } from "@react-google-maps/api";
const GOOGLE_APP_KEY = "AIzaSyDVFOtkV_zQmarBaru6SQ1qozIxAe5G66w";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <LoadScript googleMapsApiKey={GOOGLE_APP_KEY}>
        <HashRouter>
          <App />
        </HashRouter>
      </LoadScript>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
