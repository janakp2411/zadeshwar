import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { REQUEST_HELLO_WORLD, receiveHelloWorld } from '../../actions';

function* helloWorld(action) {
  try {
    yield put(receiveHelloWorld("Hello world from redux saga!"));
  } catch (e) {
    yield put(receiveHelloWorld("Hello world from redux saga!"));
  }
}

export default function* mySaga() {
  yield takeLatest(REQUEST_HELLO_WORLD, helloWorld);
}
