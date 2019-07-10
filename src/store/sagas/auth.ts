import { put, delay } from 'redux-saga/effects';
import { authLogout, authInitiateLogout, authStart, authSuccess, checkAuthTimeout, authFail } from '../actions/auth';
import { AuthInitiateLogout, AuthCheckTimeout, AuthUser } from '../actions';
import axiosInstance from '../../axios';

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

export function* authUserSaga(action: AuthUser) {
  yield put(authStart());
  const authData = {
    email: action.payload.email,
    password: action.payload.password,
    returnSecureToken: true,
  };

  let url = `/authentication/signup`;

  if (!action.payload.isSignup) {
    url = `/authentication/signin`;
  }

  try {
    const response = yield axiosInstance
      .post(url, authData)
    const userId = response.data.localId;
    const idToken = response.data.idToken;
    const expiresInSeconds = response.data.expiresIn;
    const expirationTime = new Date().getTime() + expiresInSeconds * 1000;
    localStorage.setItem('userId', userId);
    localStorage.setItem('idToken', idToken);
    localStorage.setItem('expirationTime', `${expirationTime}`);
    yield put(
      authSuccess({
        userId,
        idToken,
      }),
    );
    yield put(checkAuthTimeout(expiresInSeconds));
  } catch (error) {
    yield put(authFail(error.response.data.error));
  }
}

export function* authInitSaga () {
  const userId = localStorage.getItem('userId');
  const idToken = localStorage.getItem('idToken');
  const expirationTime = parseInt(localStorage.getItem('expirationTime')!, 10);

  if (idToken) {
    const expirationTimeFromNow = expirationTime - new Date().getTime();
    const expirationTimeFromNowInSeconds = expirationTimeFromNow / 1000;
    if (expirationTimeFromNow <= 0) {
      yield put(authInitiateLogout());
    } else {
      yield put(
        authSuccess({
          userId,
          idToken,
        }),
      );
      yield put(checkAuthTimeout(expirationTimeFromNowInSeconds));
    }
  }
}
