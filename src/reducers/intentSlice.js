// import { createSlice } from "@reduxjs/toolkit";
import { createReducer } from "@reduxjs/toolkit";
import { getIntents } from "../api/api";
import { selectIndent } from "./action";

const indentList = await getIntents();

const initialState = {
  indentList: indentList,
  selectedIndent: null
};

const intentReducer = createReducer(initialState, (builder) => {
  builder.addCase("SELECT_INDENT", (state, action) => {
    // // 액션 처리 로직
    const indent = action.payload;
    return { ...state, selectedIndent: indent };
  });
  builder.addCase("GET_INTENT_LIST", (state, action) => {
    return { ...state, indentList: indentList };
  });
});

export default intentReducer;
