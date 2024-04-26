import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, logoutApi } from "../api/api";

export const SELECT_MENU = "SELECT_MENU";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const CHANGE_THEME = "CHANGE_THEME";
export const CHAT_MODAL = "CHAT_MODAL";

export const selectMenu = (payload) => ({
  type: SELECT_MENU,
  payload
});

export const login = createAsyncThunk("LOGIN", async (data, thunkAPI) => {
  try {
    const response = await loginApi(data);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(
      err.response ? err.response.data : err.message
    );
  }
});

export const logout = createAsyncThunk("LOGOUT", async (data, thunkAPI) => {
  try {
    const response = await logoutApi(data);
    return response.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(
      err.response ? err.response.data : err.message
    );
  }
});

export const changeTheme = (payload) => ({
  type: CHANGE_THEME,
  payload
});

export const chatModal = () => ({ type: CHAT_MODAL });
