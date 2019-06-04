import { ActionTypes, PurchaseBurgerSuccess, PurchaseBurgerFail, PurchaseBurgerStart, PurchaseInit, FetchOrdersSuccess, FetchOrdersFailed, FetchOrdersStart} from './actionTypes';
import { ThunkAction } from 'redux-thunk';
import axiosInstance from '../../axios';
import { AppState } from '../app.state';

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

export const purchaseBurger = (orderData: any): ThunkAction<void, {}, {}, PurchaseBurgerStart | PurchaseBurgerSuccess | PurchaseBurgerFail> => (dispatch) => {
  dispatch(purchaseBurgerStart());
  axiosInstance
    .post('/orders', orderData)
    .then((response) => {
      dispatch(purchaseBurgerSuccess(response.data.name, orderData));
    })
    .catch((error) => {
      dispatch(purchaseBurgerFail(error));
    });
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

export const fetchOrders = (userId: string) => (
  dispatch: Function,
) => {
    // axiosInstance.get('/orders/byUser/')
    axiosInstance.get('/orders/byUser', {params: { userId } })
      .then((response) => {
        const ordersObject = Object.entries(response.data).map(([key, value]: [string, any]) => {
          return {
            ...value,
            id: key,
          };
        });
        dispatch(fetchOrdersSuccess(ordersObject));
      })
      .catch((error) => dispatch(fetchOrdersFailed(error)));
}
