import produce from "immer";
import * as type from "actions/type/header";

const initialState = {
  selectedHeader: "aptTransactionDetail"
};

const header = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case type.SELECT_HEADER:
        // console.log("SELECT_HEADER", action.payload.data);
        draft.selectedHeader = action.payload.data;
        break;
      default:
        break;
    }
  });

export default header;
