import React from "react";
import ReactDOM from "react-dom"; // No need for /client in React 16
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./reducers/store.js";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
