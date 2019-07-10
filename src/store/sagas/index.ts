import { takeEvery } from 'redux-saga/effects';
import { ActionTypes } from '../actions';
import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authInitSaga } from './auth';
import { initializeIngredientsSaga } from './burgerBuilder';
import { purchaseBurgerSaga, fetchOrdersSaga } from './orders';

export function* watchAuthSaga() {
  yield takeEvery(ActionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(ActionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
  yield takeEvery(ActionTypes.AUTH_USER, authUserSaga);
  yield takeEvery(ActionTypes.AUTH_INIT, authInitSaga);
}

export function* watchBurgerBuilderSaga() {
  yield takeEvery(ActionTypes.INITIALIZE_INGREDIENTS, initializeIngredientsSaga);
}

export function* watchOrdersSaga() {
  yield takeEvery(ActionTypes.PURCHASE_BURGER, purchaseBurgerSaga);
  yield takeEvery(ActionTypes.FETCH_ORDERS, fetchOrdersSaga);
}
