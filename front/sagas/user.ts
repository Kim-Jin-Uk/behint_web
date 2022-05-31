import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import {
  GET_AGREEMENT_FAILURE,
  GET_AGREEMENT_REQUEST,
  GET_AGREEMENT_SUCCESS,
  IS_LOGIN_FAILURE,
  IS_LOGIN_REQUEST,
  IS_LOGIN_SUCCESS,
  OTHER_PROFILE_FAILURE,
  OTHER_PROFILE_REQUEST,
  OTHER_PROFILE_SUCCESS,
  SET_AGREEMENT_FAILURE,
  SET_AGREEMENT_REQUEST,
  SET_AGREEMENT_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  User,
  UserAgreement,
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

function updateProfileAPI(data: User) {
  return axios.post(`/user/profile/update`, data);
}
function* updateProfile(action: any) {
  try {
    const result: AxiosResponse<any> = yield call(
      updateProfileAPI,
      action.data,
    );
    yield put({
      type: UPDATE_PROFILE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPDATE_PROFILE_FAILURE,
      error: err,
    });
  }
}

function setAgreementAPI(data: UserAgreement) {
  return axios.post(`/user/agreement`, data);
}
function* setAgreement(action: any) {
  try {
    const result: AxiosResponse<any> = yield call(setAgreementAPI, action.data);
    yield put({
      type: SET_AGREEMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: SET_AGREEMENT_FAILURE,
      error: err,
    });
  }
}

function getAgreementAPI() {
  return axios.get(`/user/agreement`);
}
function* getAgreement(action: any) {
  try {
    const result: AxiosResponse<any> = yield call(getAgreementAPI);
    yield put({
      type: GET_AGREEMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: GET_AGREEMENT_FAILURE,
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
function* watchUpdateProfile() {
  yield takeLatest(UPDATE_PROFILE_REQUEST, updateProfile);
}
function* watchSetAgreement() {
  yield takeLatest(SET_AGREEMENT_REQUEST, setAgreement);
}
function* watchGetAgreement() {
  yield takeLatest(GET_AGREEMENT_REQUEST, getAgreement);
}

export default function* userSaga() {
  yield all([
    fork(watchIsLogin),
    fork(watchOtherProfile),
    fork(watchUpdateProfile),
    fork(watchSetAgreement),
    fork(watchGetAgreement),
  ]);
}
