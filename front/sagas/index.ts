import { all, fork } from 'redux-saga/effects';
import axios from 'axios';
import userSaga from './user';
import projectSaga from './project';

axios.defaults.baseURL = 'http://localhost:3095';
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([fork(userSaga), fork(projectSaga)]);
}
