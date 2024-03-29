export const DELETE_INDENT = "DELETE_INDENT";
export const SELECT_INDENT = "SELECT_INDENT";
export const SELECT_MENU = "SELECT_MENU";

export const selectMenu = (payload) => ({
  type: SELECT_MENU,
  payload
});

export const selectIndent = (payload) => ({
  type: SELECT_INDENT,
  payload
});

export const deleteIntend = (payload) => ({
  type: DELETE_INDENT,
  payload
});
