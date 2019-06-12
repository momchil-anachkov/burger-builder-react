import { put, delay } from 'redux-saga/effects';
import { authLogout, authInitiateLogout } from '../actions/auth';
import { AuthInitiateLogout, AuthCheckTimeout } from '../actions';

export function* logoutSaga(action: AuthInitiateLogout) {
  localStorage.removeItem('userId');
  localStorage.removeItem('idToken');
  localStorage.removeItem('expirationTime');
  yield put(authLogout());
}

export function* checkAuthTimeoutSaga(action: AuthCheckTimeout) {
  yield delay(action.payload.expiresIn * 1000);
  yield put(authInitiateLogout());
}
