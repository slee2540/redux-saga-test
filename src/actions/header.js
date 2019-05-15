import * as type from "actions/type/header";

export const selectHeader = data => ({
  type: type.SELECT_HEADER,
  payload: {
    data
  }
});
