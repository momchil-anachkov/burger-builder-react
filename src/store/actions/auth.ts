import { AuthStart, ActionTypes, AuthSuccess, AuthFail, AuthInitiateLogout, AuthLogout, AuthCheckTimeout, AuthUser } from './actionTypes';
import axiosInstance from '../../axios';
import { ThunkDispatch } from 'redux-thunk';
import { Dispatch } from 'redux';

export const authStart = (): AuthStart => ({
  type: ActionTypes.AUTH_START,
});

export const authSuccess = (authData: any): AuthSuccess => ({
  type: ActionTypes.AUTH_SUCCESS,
  payload: authData,
});

export const authFail = (error: Error): AuthFail => ({
  type: ActionTypes.AUTH_FAIL,
  payload: error,
});

export const authLogout = (): AuthLogout => {
  return {
    type: ActionTypes.AUTH_LOGOUT,
  };
};

export const authInitiateLogout = (): AuthInitiateLogout => {
  return {
    type: ActionTypes.AUTH_INITIATE_LOGOUT,
  };
};

export const checkAuthTimeout = (expiresIn: number): AuthCheckTimeout => {
  return {
    type: ActionTypes.AUTH_CHECK_TIMEOUT,
    payload: { expiresIn: expiresIn },
  };
};

export const auth = (email: string, password: string, isSignup: boolean): AuthUser => {
  return {
    type: ActionTypes.AUTH_USER,
    payload: {
      email,
      password,
      isSignup
    }
  }
};

export const authInit = () => (dispatch: Function) => {
  const userId = localStorage.getItem('userId');
  const idToken = localStorage.getItem('idToken');
  const expirationTime = parseInt(localStorage.getItem('expirationTime')!, 10);

  if (idToken) {
    const expirationTimeFromNow = expirationTime - new Date().getTime();
    const expirationTimeFromNowInSeconds = expirationTimeFromNow / 1000;
    if (expirationTimeFromNow <= 0) {
      dispatch(authInitiateLogout());
    } else {
      dispatch(
        authSuccess({
          userId,
          idToken,
        }),
      );
      dispatch(checkAuthTimeout(expirationTimeFromNowInSeconds));
    }
  }
};
