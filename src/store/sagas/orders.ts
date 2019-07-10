import { purchaseBurgerStart, purchaseBurgerFail, purchaseBurgerSuccess, fetchOrdersSuccess, fetchOrdersFailed } from '../actions/order';
import axiosInstance from '../../axios';
import { put } from 'redux-saga/effects';
import { PurchaseBurger, FetchOrders } from '../actions';

export function* purchaseBurgerSaga(action: PurchaseBurger) {
  yield put(purchaseBurgerStart());
  try {
    const orderData = action.payload.orderData;
    const response = yield axiosInstance.post('/orders', orderData)
    yield put(purchaseBurgerSuccess(response.data.name, orderData));
  } catch (error) {
    yield put(purchaseBurgerFail(error));
  }
}

export function* fetchOrdersSaga(action: FetchOrders) {
  const response = yield axiosInstance.get('/orders/byUser', { params: { userId: action.payload.userId } })
  try {
    const ordersObject = Object.entries(response.data).map(([key, value]: [string, any]) => {
      return {
        ...value,
        id: key,
      };
    });
    yield put(fetchOrdersSuccess(ordersObject));
  } catch (error) {
    yield put(fetchOrdersFailed(error));
  }
}
