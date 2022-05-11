import produce from '../util/produce';
import { AnyAction } from 'redux';
import { Draft } from 'immer';

export const initialState = {
  me: null,
  user: null,

  isLoginLoading: false,
  isLoginSuccess: false,
  isLoginError: null,

  otherProfileLoading: false,
  otherProfileSuccess: false,
  otherProfileError: null,
};

export const IS_LOGIN_REQUEST = 'IS_LOGIN_REQUEST';
export const IS_LOGIN_SUCCESS = 'IS_LOGIN_SUCCESS';
export const IS_LOGIN_FAILURE = 'IS_LOGIN_FAILURE';

export const OTHER_PROFILE_REQUEST = 'OTHER_PROFILE_REQUEST';
export const OTHER_PROFILE_SUCCESS = 'OTHER_PROFILE_SUCCESS';
export const OTHER_PROFILE_FAILURE = 'OTHER_PROFILE_FAILURE';

export default (state = initialState, action: AnyAction) =>
  produce(state, (draft: Draft<any>) => {
    switch (action.type) {
      case IS_LOGIN_REQUEST:
        draft.isLoginLoading = true;
        draft.isLoginSuccess = false;
        draft.isLoginError = null;
        break;
      case IS_LOGIN_SUCCESS:
        draft.isLoginLoading = false;
        draft.isLoginSuccess = true;
        draft.isLoginError = null;
        draft.me = action.data;
        break;
      case IS_LOGIN_FAILURE:
        draft.isLoginLoading = false;
        draft.isLoginSuccess = false;
        draft.isLoginError = action.error;
        draft.me = null;
        break;

      case OTHER_PROFILE_REQUEST:
        draft.otherProfileLoading = true;
        draft.otherProfileSuccess = false;
        draft.otherProfileError = null;
        break;
      case OTHER_PROFILE_SUCCESS:
        draft.otherProfileLoading = false;
        draft.otherProfileSuccess = true;
        draft.otherProfileError = null;
        draft.user = action.data;
        break;
      case OTHER_PROFILE_FAILURE:
        draft.otherProfileLoading = false;
        draft.otherProfileSuccess = false;
        draft.otherProfileError = action.error;
        draft.user = null;
        break;
      default:
        break;
    }
  });
