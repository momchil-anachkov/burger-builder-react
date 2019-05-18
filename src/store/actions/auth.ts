import { AuthStart, ActionTypes, AuthSuccess, AuthFail } from './actionTypes';

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
}
