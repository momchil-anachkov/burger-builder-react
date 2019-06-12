import { AuthStart, ActionTypes, AuthSuccess, AuthFail, AuthInitiateLogout, AuthLogout, AuthCheckTimeout } from './actionTypes';
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

export const auth = (email: string, password: string, isSignup: boolean) => (dispatch: Function) => {
  dispatch(authStart());
  const authData = {
    email,
    password,
    returnSecureToken: true,
  };

  let url = `/authentication/signup`;

  if (!isSignup) {
    url = `/authentication/signin`;
  }

  axiosInstance
    .post(url, authData)
    .then((response) => {
      // dispatch
      const userId = response.data.localId;
      const idToken = response.data.idToken;
      const expiresInSeconds = response.data.expiresIn;
      const expirationTime = new Date().getTime() + expiresInSeconds * 1000;
      localStorage.setItem('userId', userId);
      localStorage.setItem('idToken', idToken);
      localStorage.setItem('expirationTime', `${expirationTime}`);
      dispatch(
        authSuccess({
          userId,
          idToken,
        }),
      );
      dispatch(checkAuthTimeout(expiresInSeconds));
    })
    .catch((error) => {
      dispatch(authFail(error.response.data.error));
    });
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
