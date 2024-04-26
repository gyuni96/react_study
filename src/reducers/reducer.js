import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  selectMenu: localStorage.getItem("navigation") || "INTENT",
  isLogin: !!localStorage.getItem("user"),
  theme: localStorage.getItem("theme") || "blueTheme",
  isChatModal: false
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase("SELECT_MENU", (state, action) => {
      const menu = action.payload;
      localStorage.setItem("navigation", menu);
      state.selectMenu = menu;
    })
    .addCase("LOGIN/fulfilled", (state, action) => {
      const user = action.payload;
      const token = {};
      token.accessToken = user.accessToken;
      token.refreshToken = user.refreshToken;

      delete user.accessToken;
      delete user.refreshToken;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", JSON.stringify(token));
      state.isLogin = true;
    })
    .addCase("LOGOUT/fulfilled", (state) => {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      state.isLogin = false;
    })
    .addCase("CHANGE_THEME", (state) => {
      const newTheme =
        state.theme === "blueTheme" ? "orangeTheme" : "blueTheme";
      localStorage.setItem("theme", newTheme);
      state.theme = newTheme;
    })
    .addCase("CHAT_MODAL", (state) => {
      state.isChatModal = !state.isChatModal;
    });
});

export default reducer;
