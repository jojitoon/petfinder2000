import * as Auth from '../constants/auth.constants';

import AxiosDefault from '../defaults/axiosInstance';
import actionCreator from '../../utils/actionCreator';
import { setUserData, removeUserData, setTokenData } from '../../utils/storage';
import { getDiscount } from './stock.action';

export const signUp = (payload, action) => async (dispatch) => {
  try {
    dispatch(actionCreator(Auth.SIGN_UP_REQUEST));
    const { data } = await AxiosDefault({
      method: 'POST',
      url: 'users/signup',
      data: payload,
    });

    if (data.status === 'success') {
      dispatch(actionCreator(Auth.SIGN_UP_SUCCESS, data));
      dispatch(
        login(
          {
            username: payload.email,
            password: payload.password,
          },
          action
        )
      );
    }
  } catch (error) {
    dispatch(actionCreator(Auth.SIGN_UP_FAILURE));
    alert('error signing up. Try again');
    console.log(error, error.response);
  }
};

export const logout = (action) => async (dispatch) => {
  dispatch(actionCreator(Auth.LOG_OUT));
  removeUserData();
  localStorage.clear();
  AxiosDefault.defaults.headers.authorization = null;
  return action && action();
};

export const login = (payload, action) => async (dispatch) => {
  try {
    dispatch(actionCreator(Auth.LOGIN_REQUEST));
    const { data } = await AxiosDefault({
      method: 'POST',
      url: 'users/signin',
      data: payload,
    });

    if (data.status === 'success') {
      dispatch(
        actionCreator(Auth.LOGIN_SUCCESS, { ...data.user, token: data.token })
      );
      setTokenData(data.token);
      AxiosDefault.defaults.headers.authorization = data.token;
      dispatch(fetchUserDetails(action));
      dispatch(getDiscount());
    }
  } catch (error) {
    dispatch(actionCreator(Auth.LOGIN_FAILURE));
    alert('error logging in. Try again');
    console.log(error, error.response);
  }
};
export const createOrder = (payload, action) => async (dispatch) => {
  try {
    dispatch(actionCreator(Auth.LOGIN_REQUEST));
    const { data } = await AxiosDefault({
      method: 'POST',
      url: 'users/createorder',
      data: payload,
    });

    if (data.status === 'success') {
      dispatch(actionCreator(Auth.SET_ORDER_ID, data.orderId));
      dispatch(fetchUserDetails(action));
    }
  } catch (error) {
    dispatch(actionCreator(Auth.LOGIN_FAILURE));
    if (error.response) {
      alert(error.response.data.message);
    } else {
      alert('error creating order');
    }
    console.log(error, error.response);
  }
};

export const verifyOrder = (
  { response, cartTotal, orderId },
  action,
  errorAction
) => async (dispatch) => {
  console.log(response);
  const txRef = response.tx_ref;

  try {
    dispatch(actionCreator(Auth.VERIFY_ORDER_REQUEST));
    const { data } = await AxiosDefault({
      method: 'POST',
      url: 'users/verifyOrder',
      data: { orderId, amount: cartTotal, txref: txRef },
    });

    console.log(data);
    if (data.status) {
      dispatch(actionCreator(Auth.VERIFY_ORDER_SUCCESS));
      dispatch(fetchUserDetails(action));
    }
    // if (data.status === 'success') {
    // }
  } catch (error) {
    dispatch(actionCreator(Auth.VERIFY_ORDER_FAILURE));
    errorAction && errorAction();
    alert('error confirming payment order. Please contact system admin');
    console.log(error, error.response);
  }
};

export const updateAddress = (payload, action) => async (dispatch) => {
  try {
    dispatch(actionCreator(Auth.USER_DETAIL_REQUEST));
    const { data } = await AxiosDefault({
      method: 'PATCH',
      url: 'users/address',
      data: payload,
    });

    if (data.status === 'success') {
      dispatch(fetchUserDetails(action));
    }
  } catch (error) {
    dispatch(actionCreator(Auth.USER_DETAIL_FAILURE));
    alert('error updating address');
    console.log(error, error.response);
  }
};

export const fetchUserDetails = (action) => async (dispatch) => {
  try {
    dispatch(actionCreator(Auth.USER_DETAIL_REQUEST));
    const { data: responseData } = await AxiosDefault({
      method: 'GET',
      url: `users`,
    });

    if (responseData.status === 'success') {
      await dispatch(
        actionCreator(Auth.USER_DETAIL_SUCCESS, {
          ...responseData.user,
        })
      );
      setUserData(responseData.user);
      action && action();
    }
  } catch (error) {
    dispatch(actionCreator(Auth.USER_DETAIL_FAILURE));
    console.log(error);
  }
};
