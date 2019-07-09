import { takeEvery } from 'redux-saga/effects';
import { ActionTypes } from '../actions';
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga } from './auth';

export function* rootSaga() {
  yield takeEvery(ActionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(ActionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  yield takeEvery(ActionTypes.AUTH_USER, authUserSaga);
}
