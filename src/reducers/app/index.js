import { RECEIVE_HELLO_WORLD } from '../../actions/index';

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

