import { combineReducers } from "redux";
import { appContextReducer, appDataReducer, appHistoryReducer} from "./app/index";
import errorReducer from './errorReducer';
import authReducer from './authReducer';

const reduxers = {
  appContext: appContextReducer,
  appData: appDataReducer,
  errors: errorReducer,
  auth: authReducer,
  history: appHistoryReducer
};

export default reduxers;
