import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";

import store from "./redux/store";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { positions, transitions, Provider as Alertprovider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
store.subscribe(() => console.log(store.getState()));

const options = {
  timeout: 2000,
  positions: positions.BOTTOM_CENTER,
  transitions: transitions.SCALE,
};
ReactDOM.render(
  <Provider store={store}>
    <Alertprovider template={AlertTemplate} {...options}>
      <App />
    </Alertprovider>
  </Provider>,
  document.getElementById("root")
);
