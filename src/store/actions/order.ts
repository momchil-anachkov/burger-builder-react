import { ActionTypes, PurchaseBurgerSuccess, PurchaseBurgerFail, PurchaseBurgerStart, PurchaseInit, FetchOrdersSuccess, FetchOrdersFailed, FetchOrdersStart, PurchaseBurger} from './actionTypes';
import { ThunkAction } from 'redux-thunk';
import axiosInstance from '../../axios';

export const purchaseBurgerStart = (): PurchaseBurgerStart => ({
  type: ActionTypes.PURCHASE_BURGER_START,
})

export const purchaseBurgerSuccess = (id: string, orderData: any): PurchaseBurgerSuccess => ({
  type: ActionTypes.PURCHASE_BURGER_SUCCESS,
  payload: {
    orderId: id,
    orderData: orderData
  }
});

export const purchaseBurgerFail = (error: string): PurchaseBurgerFail => ({
  type: ActionTypes.PURCHASE_BURGER_FAIL,
  payload: error
});

export const purchaseBurger = (orderData: any): PurchaseBurger => {
  return {
    type: ActionTypes.PURCHASE_BURGER,
    payload: {
      orderData
    }
  };
};

export const purchaseInit = (): PurchaseInit => ({
  type: ActionTypes.PURCHASE_INIT,
});

export const fetchOrdersStart = (): FetchOrdersStart => ({
  type: ActionTypes.FETCH_ORDERS_START,
});

export const fetchOrdersSuccess = (ordersObject: any[]): FetchOrdersSuccess => ({
  type: ActionTypes.FETCH_ORDERS_SUCCESS,
  payload: ordersObject
})

export const fetchOrdersFailed = (error: Error): FetchOrdersFailed => ({
  type: ActionTypes.FETCH_ORDERS_FAILED,
  payload: error
});

export const fetchOrders = (userId: string) => {
  return {
    type: ActionTypes.FETCH_ORDERS,
    payload: {
      userId
    }
  }
}
