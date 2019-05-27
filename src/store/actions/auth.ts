import { AuthStart, ActionTypes, AuthSuccess, AuthFail, AuthLogout } from './actionTypes';
import axiosInstance from '../../axios';

export const authStart = (): AuthStart  => ({
  type: ActionTypes.AUTH_START,
});

export const authSuccess = (authData: any): AuthSuccess  => ({
  type: ActionTypes.AUTH_SUCCESS,
  payload: authData,
});

export const authFail = (error: Error): AuthFail  => ({
  type: ActionTypes.AUTH_FAIL,
  payload: error,
});

export const authLogout = (): AuthLogout => ({
  type: ActionTypes.AUTH_LOGOUT,
})

export const checkAuthTimeout = (expiresIn: number) => (dispatch: Function) => {
  setTimeout(() => {
    dispatch(authLogout());
  }, expiresIn * 1000);
}

export const auth = (email: string, password: string, isSignup: boolean) => (dispatch: Function) => {
  dispatch(authStart());
  const authData = {
    email: email,
    password: password,
    returnSecureToken: true,
  }

  let url = `/authentication/signup`;

  if (!isSignup) {
    url = `/authentication/signin`;
  }

  axiosInstance.post(
    url,
    authData,
  )
    .then((response) => {
      // dispatch
      console.log(response);
      dispatch(authSuccess({
        userId: response.data.localId,
        idToken: response.data.idToken,
      }));
      dispatch(checkAuthTimeout(response.data.expiresIn));
    })
    .catch((error) => {
      console.log(error);
      dispatch(authFail(error.response.data.error))
    });
}
