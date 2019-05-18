import { AuthStart, ActionTypes, AuthSuccess, AuthFail } from './actionTypes';
import axios from 'axios';
import { API_KEY } from '../../keys/firebase';

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

export const auth = (email: string, password: string) => (dispatch: Function) => {
  dispatch(authStart());
  const authData = {
    email: email,
    password: password,
    returnSecureToken: true,
  }

  axios.post(
    `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`,
    authData,
  )
    .then((response) => {
      // dispatch
      console.log(response);
      dispatch(authSuccess(response.data))
    })
    .catch((error: Error) => {
      console.log(error);
      dispatch(authFail(error))
    });
}
