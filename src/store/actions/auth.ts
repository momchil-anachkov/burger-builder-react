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

export const auth = (email: string, password: string, isSignup: boolean) => (dispatch: Function) => {
  dispatch(authStart());
  const authData = {
    email: email,
    password: password,
    returnSecureToken: true,
  }

  let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${API_KEY}`;

  if (!isSignup) {
    url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${API_KEY}`;
  }


  axios.post(
    url,
    authData,
  )
    .then((response) => {
      // dispatch
      console.log(response);
      dispatch(authSuccess({
        userId: response.data.localId,
        idToken: response.data.idToken,
      }))
    })
    .catch((error: Error) => {
      console.log(error);
      dispatch(authFail(error))
    });
}
