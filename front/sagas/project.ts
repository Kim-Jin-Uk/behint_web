import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import {
  GET_THUMBNAIL_LIST_FAILURE,
  GET_THUMBNAIL_LIST_REQUEST,
  GET_THUMBNAIL_LIST_SUCCESS,
  UPLOAD_VIDEO_FAILURE,
  UPLOAD_VIDEO_FILE_FAILURE,
  UPLOAD_VIDEO_FILE_REQUEST,
  UPLOAD_VIDEO_FILE_SUCCESS,
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

function uploadVideoFileAPI(data: any) {
  return axios.post(`/project/upload/video`, data);
}
function* uploadVideoFile(action: any) {
  try {
    const result: AxiosResponse<any> = yield call(
      uploadVideoFileAPI,
      action.data,
    );
    yield put({
      type: UPLOAD_VIDEO_FILE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPLOAD_VIDEO_FILE_FAILURE,
      error: err,
    });
  }
}

function getThumbnailListAPI(data: any) {
  return axios.post(`/project/thumbnail/list`, data);
}
function* getThumbnailList(action: any) {
  try {
    const result: AxiosResponse<any> = yield call(
      getThumbnailListAPI,
      action.data,
    );
    yield put({
      type: GET_THUMBNAIL_LIST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: GET_THUMBNAIL_LIST_FAILURE,
      error: err,
    });
  }
}

function* watchUploadVideo() {
  yield takeLatest(UPLOAD_VIDEO_REQUEST, uploadVideo);
}
function* watchUploadVideoFile() {
  yield takeLatest(UPLOAD_VIDEO_FILE_REQUEST, uploadVideoFile);
}
function* watchGetThumbnailList() {
  yield takeLatest(GET_THUMBNAIL_LIST_REQUEST, getThumbnailList);
}

export default function* projectSaga() {
  yield all([
    fork(watchUploadVideo),
    fork(watchUploadVideoFile),
    fork(watchGetThumbnailList),
  ]);
}
