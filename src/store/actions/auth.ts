import { AuthStart, ActionTypes, AuthSuccess, AuthFail, AuthInitiateLogout, AuthLogout, AuthCheckTimeout, AuthUser, AuthInit } from './actionTypes';

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

export const authInit = (): AuthInit => {
  return {
    type: ActionTypes.AUTH_INIT,
  }
};
