import produce from '../util/produce';
import { AnyAction } from 'redux';
import { Draft } from 'immer';

export const initialState = {
  me: null,
  user: null,
  agreement: false,

  isLoginLoading: false,
  isLoginSuccess: false,
  isLoginError: null,

  otherProfileLoading: false,
  otherProfileSuccess: false,
  otherProfileError: null,

  updateProfileLoading: false,
  updateProfileSuccess: false,
  updateProfileError: null,

  setAgreementLoading: false,
  setAgreementSuccess: false,
  setAgreementError: null,

  getAgreementLoading: false,
  getAgreementSuccess: false,
  getAgreementError: null,
};

export const IS_LOGIN_REQUEST = 'IS_LOGIN_REQUEST';
export const IS_LOGIN_SUCCESS = 'IS_LOGIN_SUCCESS';
export const IS_LOGIN_FAILURE = 'IS_LOGIN_FAILURE';

export const OTHER_PROFILE_REQUEST = 'OTHER_PROFILE_REQUEST';
export const OTHER_PROFILE_SUCCESS = 'OTHER_PROFILE_SUCCESS';
export const OTHER_PROFILE_FAILURE = 'OTHER_PROFILE_FAILURE';

export const UPDATE_PROFILE_REQUEST = 'UPDATE_PROFILE_REQUEST';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const UPDATE_PROFILE_FAILURE = 'UPDATE_PROFILE_FAILURE';

export const SET_AGREEMENT_REQUEST = 'SET_AGREEMENT_REQUEST';
export const SET_AGREEMENT_SUCCESS = 'SET_AGREEMENT_SUCCESS';
export const SET_AGREEMENT_FAILURE = 'SET_AGREEMENT_FAILURE';

export const GET_AGREEMENT_REQUEST = 'GET_AGREEMENT_REQUEST';
export const GET_AGREEMENT_SUCCESS = 'GET_AGREEMENT_SUCCESS';
export const GET_AGREEMENT_FAILURE = 'GET_AGREEMENT_FAILURE';

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

      case UPDATE_PROFILE_REQUEST:
        draft.updateProfileLoading = true;
        draft.updateProfileSuccess = false;
        draft.updateProfileError = null;
        break;
      case UPDATE_PROFILE_SUCCESS:
        draft.updateProfileLoading = false;
        draft.updateProfileSuccess = true;
        draft.updateProfileError = null;
        draft.me = action.data;
        break;
      case UPDATE_PROFILE_FAILURE:
        draft.updateProfileLoading = false;
        draft.updateProfileSuccess = false;
        draft.updateProfileError = action.error;
        draft.me = null;
        break;

      case SET_AGREEMENT_REQUEST:
        draft.setAgreementLoading = true;
        draft.setAgreementSuccess = false;
        draft.setAgreementError = null;
        break;
      case SET_AGREEMENT_SUCCESS:
        draft.setAgreementLoading = false;
        draft.setAgreementSuccess = true;
        draft.setAgreementError = null;
        draft.agreement = action.data;
        break;
      case SET_AGREEMENT_FAILURE:
        draft.setAgreementLoading = false;
        draft.setAgreementSuccess = false;
        draft.setAgreementError = action.error;
        draft.agreement = false;
        break;

      case GET_AGREEMENT_REQUEST:
        draft.getAgreementLoading = true;
        draft.getAgreementSuccess = false;
        draft.getAgreementError = null;
        break;
      case GET_AGREEMENT_SUCCESS:
        draft.getAgreementLoading = false;
        draft.getAgreementSuccess = true;
        draft.getAgreementError = null;
        draft.agreement = action.data;
        break;
      case GET_AGREEMENT_FAILURE:
        draft.getAgreementLoading = false;
        draft.getAgreementSuccess = false;
        draft.getAgreementError = action.error;
        draft.agreement = false;
        break;
      default:
        break;
    }
  });

export type User = {
  id: number;
  profiles: {
    nickname: string;
    job: string;
    location: string;
    profileImgUrl: string;
    introduce: string;
    instagramUrl: string;
    youtubeUrl: string;
    facebookUrl: string;
    tweeterUrl: string;
    etcUrl: string;
  }[];
  informations: {
    title: string;
    startDate: Date | null;
    endDate: Date | null;
    position: string | null;
    detailContents: string | null;
    informationUrl: string | null;
    type: string;
  }[];
};
export type UserAgreement = {
  termOfService: boolean;
  personalInformation: boolean;
  eventReceive: boolean;
};
