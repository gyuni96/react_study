export const GET_INDENT_LIST = "GET_INDENT_LIST";
export const SELECT_INDENT = "SELECT_INDENT";

export const selectIndent = (payload) => ({
  type: SELECT_INDENT,
  payload
});

export const getIntentList = () => ({
  type: GET_INDENT_LIST
});
