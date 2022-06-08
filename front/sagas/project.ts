import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import {
  UPLOAD_VIDEO_FAILURE,
  UPLOAD_VIDEO_REQUEST,
  UPLOAD_VIDEO_SUCCESS,
} from '../reducers/project';
import axios, { AxiosResponse } from 'axios';

function uploadVideoAPI(data: any) {
  return axios.post(`/project/thumbnail`, data);
}
function* uploadVideo(action: any) {
  try {
    const result: AxiosResponse<any> = yield call(uploadVideoAPI, action.data);
    yield put({
      type: UPLOAD_VIDEO_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPLOAD_VIDEO_FAILURE,
      error: err,
    });
  }
}

function* watchUploadVideo() {
  yield takeLatest(UPLOAD_VIDEO_REQUEST, uploadVideo);
}

export default function* projectSaga() {
  yield all([fork(watchUploadVideo)]);
}
