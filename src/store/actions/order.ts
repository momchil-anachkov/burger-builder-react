import { ActionTypes, PurchaseBurgerSuccess, PurchaseBurgerFail, PurchaseBurgerStart, PurchaseInit } from './actionTypes';
import orders from '../../axios-orders';
import { ThunkAction } from 'redux-thunk';

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
  orders
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
