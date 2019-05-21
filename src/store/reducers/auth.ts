import { AuthActions, ActionTypes, AuthStart, AuthSuccess, AuthFail, AuthLogout } from '../actions';
import { updateObject } from '../utility';
import { AuthState } from '../auth.state';

const initialState: AuthState = {
  token: null,
  userId: null,
  error: null,
  loading: false
};

const authStart = (state: AuthState, action: AuthStart): AuthState => {
  return updateObject(state, {
    loading: true,
    error: null,
  });
};

const authSuccess = (state: AuthState, action: AuthSuccess): AuthState => {
  return updateObject(state, {
    loading: false,
    error: null,
    userId: action.payload.userId,
    token: action.payload.idToken,
  });
};

const authFail = (state: AuthState, action: AuthFail): AuthState => {
  return updateObject(state, {
    loading: false,
    error: action.payload,
    userId: null,
    token: null,
  });
};

const authLogout = (state: AuthState, action: AuthLogout): AuthState => {
  return updateObject(state, {
    userId: null,
    token: null,
  })
}

export const authReducer = (state: AuthState = initialState, action: AuthActions): AuthState => {
  switch (action.type) {
    case ActionTypes.AUTH_START:
      return authStart(state, action);

    case ActionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);

    case ActionTypes.AUTH_FAIL:
      return authFail(state, action);

    case ActionTypes.AUTH_LOGOUT:
      return authLogout(state, action);

    default:
      return state;
  }
};

export default authReducer;
