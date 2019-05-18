import { AuthActions, ActionTypes, AuthStart, AuthSuccess, AuthFail } from '../actions';
import { updateObject } from '../utility';
import { AuthState } from '../auth.state';

const initialState: AuthState = {
  token: null,
  userId: null,
  error: null,
  loading: false
};

const authStart = (state: AuthState, action: AuthStart) => {
  return updateObject(state, {
    loading: true,
    error: null,
  });
};

const authSuccess = (state: AuthState, action: AuthSuccess) => {
  return updateObject(state, {
    loading: false,
    error: null,
    userId: action.payload.userId,
    token: action.payload.idToken,
  });
};

const authFail = (state: AuthState, action: AuthFail) => {
  return updateObject(state, {
    loading: false,
    error: action.payload,
    userId: null,
    token: null,
  });
};

export const authReducer = (state: AuthState = initialState, action: AuthActions) => {
  switch (action.type) {
    case ActionTypes.AUTH_START:
      return authStart(state, action);

    case ActionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);

    case ActionTypes.AUTH_FAIL:
      return authFail(state, action);

    default:
      return state;
  }
};

export default authReducer;
