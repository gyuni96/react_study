import { configureStore } from "@reduxjs/toolkit";
import intentReducer from "./reducer";

const store = configureStore({
  reducer: { intentReducer }
});

export default store;
