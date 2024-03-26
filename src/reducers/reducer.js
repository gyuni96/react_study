// import { createSlice } from "@reduxjs/toolkit";
import { createReducer } from "@reduxjs/toolkit";
import { getIntentsCall } from "../api/api";

// const indentList = await getIntentsCall();

const initialState = {
  // indentList: indentList,
  indentList: [],
  selectedIndent: null
};

const intentReducer = createReducer(initialState, (builder) => {
  builder.addCase("SELECT_INDENT", (state, action) => {
    const indentId = action.payload;
    return { ...state, selectedIndent: indentId };
  });
  builder.addCase("DELETE_INDENT", (state, action) => {
    const indentId = action.payload;
    console.log(indentId);
    const updatedIndentList = state.indentList.filter(
      (item) => item.intentId !== indentId
    );
    return { ...state, indentList: updatedIndentList };
  });
});

export default intentReducer;