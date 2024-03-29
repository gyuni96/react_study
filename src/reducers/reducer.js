import { createReducer } from "@reduxjs/toolkit";
import { getIntentsApi } from "../api/api";

// const indentList = await getIntentsApi();

const initialState = {
  selectMenu: ""
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase("SELECT_MENU", (state, action) => {
    const menu = action.payload;
    return { ...state, selectMenu: menu };
  });
  // builder.addCase("SELECT_INDENT", (state, action) => {
  //   const indentId = action.payload;
  //   return { ...state, selectedIndent: indentId };
  // });
  // builder.addCase("DELETE_INDENT", (state, action) => {
  //   const indentId = action.payload;
  //   console.log(indentId);
  //   const updatedIndentList = state.indentList.filter(
  //     (item) => item.intentId !== indentId
  //   );
  //   return { ...state, indentList: updatedIndentList };
  // });
});

export default reducer;
