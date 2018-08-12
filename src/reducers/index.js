import { combineReducers } from "redux";

import { appContextReducer, appDataReducer} from "./app/index";

const reduxers = {
  appContext: appContextReducer,
  appData: appDataReducer
};

export default reduxers;
