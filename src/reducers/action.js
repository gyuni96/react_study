export const DELETE_INDENT = "DELETE_INDENT";
export const SELECT_INDENT = "SELECT_INDENT";

export const selectIndent = (payload) => ({
  type: SELECT_INDENT,
  payload
});

export const deleteIntend = (payload) => ({
  type: DELETE_INDENT,
  payload
});
