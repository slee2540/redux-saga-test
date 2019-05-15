import { combineReducers } from "redux";

import list from "./list";
import header from "./header";

const reducers = combineReducers({
  list,
  header
});

export default reducers;
