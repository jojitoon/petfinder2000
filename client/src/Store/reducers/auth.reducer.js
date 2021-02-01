import * as Auth from '../constants/auth.constants';
import { SET_FORM, SET_INPUTS } from '../constants/inputs.constant';

const initialState = {
  authLoading: false,
  user: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case `${SET_FORM}_USER`:
      return {
        ...state,
        [action.form]: action.value,
      };
    case `${SET_INPUTS}_USER`:
      return {
        ...state,
        [action.form]: {
          ...state[action.form],
          [action.key]: action.value,
        },
      };
    case Auth.LOG_OUT:
      return {
        ...state,
        user: {},
      };

    case Auth.SIGN_UP_REQUEST:
      return {
        ...state,
        authLoading: true,
      };
    case Auth.SIGN_UP_SUCCESS:
      return {
        ...state,
        user: action.payload,
        authLoading: false,
      };

    case Auth.SIGN_UP_FAILURE:
      return {
        ...state,
        authLoading: false,
      };

    case Auth.LOGIN_REQUEST:
      return {
        ...state,
        authLoading: true,
      };

    case Auth.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        authLoading: false,
      };
    case Auth.LOGIN_FAILURE:
      return {
        ...state,
        authLoading: false,
      };

    default:
      return state;
  }
};

export default authReducer;
