import React from "react";

import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "./index.css";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { LoadScript } from "@react-google-maps/api";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_KEY}>
      <HashRouter>
        <App />
      </HashRouter>
    </LoadScript>
  </Provider>
);
