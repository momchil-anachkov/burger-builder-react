import { ActionTypes, PurchaseBurgerSuccess, PurchaseBurgerFail, PurchaseBurgerStart, PurchaseInit, FetchOrdersStart, FetchOrdersSuccess, FetchOrdersFailed } from '../actions';
import { OrderState } from '../order.state';
import { updateObject } from '../utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false,
};

export const orderReducer = (
  state: OrderState = initialState,
  action:
    PurchaseInit |
    PurchaseBurgerStart |
    PurchaseBurgerSuccess |
    PurchaseBurgerFail |
    FetchOrdersStart |
    FetchOrdersSuccess |
    FetchOrdersFailed
  ): OrderState => {
  switch (action.type) {
    case ActionTypes.PURCHASE_INIT: 
      return updateObject(state, { purchased: false });

    case ActionTypes.PURCHASE_BURGER_START:
    case ActionTypes.FETCH_ORDERS_START: 
      return updateObject(state, { loading: true });

    case ActionTypes.PURCHASE_BURGER_SUCCESS:
      const newOrder = updateObject(action.payload.orderData, { id: action.payload.orderId });
      return updateObject(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
      });

    case ActionTypes.PURCHASE_BURGER_FAIL:
    case ActionTypes.FETCH_ORDERS_FAILED:
      return updateObject(state, { loading: false });

    case ActionTypes.FETCH_ORDERS_SUCCESS:
      return updateObject(state, { orders: action.payload, loading: false });

    default:
      return state;
  }
};

export default orderReducer;
