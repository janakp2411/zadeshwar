import { RECEIVE_HELLO_WORLD } from '../../actions/index';
import { ADD_HISTORY_DATA } from '../../actions/global/actionType';

const defaultappData = {};
const defaultappContext = {};

export function appDataReducer (state = '', { type, text = '' }) {
  switch (type) {
    case RECEIVE_HELLO_WORLD:
      return 'janak';
    default:
      return state;
  }
};

export function appContextReducer (state = '', { type, text = '' }) {
  switch (type) {
    case RECEIVE_HELLO_WORLD:
      return text;
    default:
      return state;
  }
};

export function appHistoryReducer (state = '', action) {
  switch (action.type) {
    case ADD_HISTORY_DATA:
    return {...state, ...action.data}
    default:
      return state;
  }
};

