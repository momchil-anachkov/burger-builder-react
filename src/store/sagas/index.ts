import { takeEvery } from 'redux-saga/effects';
import { ActionTypes } from '../actions';
import { logoutSaga, checkAuthTimeoutSaga } from './auth';

export function* rootSaga() {
  yield takeEvery(ActionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(ActionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
}