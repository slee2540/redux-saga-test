import produce from "immer";
import * as type from "actions/type/list";

const initialState = {
  news: [],
  loading: false
};

const list = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case type.REQUEST_API:
        // console.log("REQUEST_API", action);
        draft.loading = true;
        break;

      case type.REQUEST_API_SUCCESS:
        // console.log("REQUEST_API_SUCCESS", action);
        draft.news = action.json;
        draft.loading = false;
        break;

      default:
        return state;
    }
  });

export default list;
