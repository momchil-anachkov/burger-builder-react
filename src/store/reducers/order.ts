import { ActionTypes, PurchaseBurgerSuccess, PurchaseBurgerFail, PurchaseBurgerStart, PurchaseInit } from '../actions';
import { OrderState } from '../order.state';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
}

export const orderReducer = (
  state: OrderState = initialState,
  action:
    PurchaseInit |
    PurchaseBurgerStart |
    PurchaseBurgerSuccess |
    PurchaseBurgerFail
  ): OrderState => {
  switch (action.type) {
    case ActionTypes.PURCHASE_INIT: 
      return {
        ...state,
        purchased: false
      }

    case ActionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true,
      }
    case ActionTypes.PURCHASE_BURGER_SUCCESS:
      return {
        ...state,
        loading: false,
        purchased: true,
        orders: state.orders.concat({
          ...action.payload.orderData,
          id: action.payload.orderId,
        })
      };
    case ActionTypes.PURCHASE_BURGER_FAIL:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}

export default orderReducer;
