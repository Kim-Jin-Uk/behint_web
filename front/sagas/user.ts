import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import {
  IS_LOGIN_FAILURE,
  IS_LOGIN_REQUEST,
  IS_LOGIN_SUCCESS,
  OTHER_PROFILE_FAILURE,
  OTHER_PROFILE_REQUEST,
  OTHER_PROFILE_SUCCESS,
} from '../reducers/user';
import axios, { AxiosResponse } from 'axios';

function isLoginAPI() {
  return axios.post(`/user/login`);
}

function* isLogin() {
  try {
    const result: AxiosResponse<any> = yield call(isLoginAPI);
    yield put({
      type: IS_LOGIN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: IS_LOGIN_FAILURE,
      error: err,
    });
  }
}

function otherProfileAPI(data: string) {
  return axios.get(`/user/profile/${data}`);
}

function* otherProfile(action: any) {
  try {
    const result: AxiosResponse<any> = yield call(otherProfileAPI, action.data);
    yield put({
      type: OTHER_PROFILE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: OTHER_PROFILE_FAILURE,
      error: err,
    });
  }
}

function* watchIsLogin() {
  yield takeLatest(IS_LOGIN_REQUEST, isLogin);
}
function* watchOtherProfile() {
  yield takeLatest(OTHER_PROFILE_REQUEST, otherProfile);
}

export default function* userSaga() {
  yield all([fork(watchIsLogin), fork(watchOtherProfile)]);
}
