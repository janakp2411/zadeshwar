import { call, put, takeEvery, takeLatest, select } from 'redux-saga/effects';
import axios from 'axios';
import { REQUEST_HELLO_WORLD, receiveHelloWorld } from '../../actions';
import { GET_ERRORS, SET_CURRENT_USER, REGISTER_USER, LOGIN_USER, LOGOUT_USER} from '../../actions/authentication/actionTypes';
import { historySelectory } from '../../selectors/global';

function* helloWorld(action) {
  try {
    yield put(receiveHelloWorld("Hello world from redux saga!"));
  } catch (e) {
    yield put(receiveHelloWorld("Hello world from redux saga!"));
  }
}

export default function* rootSaga() {
  yield takeLatest(REQUEST_HELLO_WORLD, helloWorld);
  yield takeEvery(REGISTER_USER, registerUser);
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeEvery(SET_CURRENT_USER, setCurrentUser);
  yield takeEvery(LOGOUT_USER, logoutUser);
}

function* registerUser({data}){
  try {
    const response = yield axios.post('/api/users/register', data)
    .then(res => res)
    .then(err => err);

    if(response.statusText === 'OK'){
      const history = yield select(historySelectory);
      history.push('/login');
    } else {
      // yield put({
      //   type: GET_ERRORS,
      //   payload: err.response.data
      // })
    }
  } catch(e) {
    console.log(e)
  }
}

function* loginUser(){
  
}

function* setCurrentUser(){
  
}

function* logoutUser(){
  
}
