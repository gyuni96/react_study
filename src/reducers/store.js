import { configureStore } from "@reduxjs/toolkit";
import intentReducer from "./intentSlice";

const store = configureStore({
  reducer: { intentReducer }
});

export default store;
