import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi } from "../api/api";

export const SELECT_MENU = "SELECT_MENU";

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const selectMenu = (payload) => ({
  type: SELECT_MENU,
  payload
});

export const login = createAsyncThunk("LOGIN", async (data, thunkAPI) => {
  try {
    const respone = await loginApi(data);
    console.log(respone);
    return respone.data;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.respone.data);
  }
});

export const logout = () => ({
  type: LOGOUT
});
