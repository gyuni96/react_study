import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  selectMenu: localStorage.getItem("navigation") || "INTENT",
  isLogin: localStorage.getItem("user") !== null && true
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase("SELECT_MENU", (state, action) => {
      const menu = action.payload;
      localStorage.setItem("navigation", action.payload);
      return { ...initialState, selectMenu: menu };
    })
    .addCase("LOGIN/fulfilled", (state, action) => {
      console.log(action.payload);
      localStorage.setItem("user", JSON.stringify(action.payload));
      return { ...initialState, isLogin: true };
    })
    .addCase("LOGOUT", (state) => {
      localStorage.removeItem("user");
      return { ...state, isLogin: false };
    });
});

export default reducer;
