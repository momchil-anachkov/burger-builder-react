import {
  ActionTypes,
  PurchaseBurgerSuccess,
  PurchaseBurgerFail,
  PurchaseBurgerStart,
  PurchaseInit,
  FetchOrdersStart,
  FetchOrdersSuccess,
  FetchOrdersFailed,
} from '../actions';
import { OrderState } from '../order.state';
import { updateObject } from '../utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const purchaseInit = (state: OrderState, action: PurchaseInit) => {
  return updateObject(state, { purchased: false });
};

const purchaseBurgerSuccess = (state: OrderState, action: PurchaseBurgerSuccess) => {
  const newOrder = updateObject(action.payload.orderData, { id: action.payload.orderId });
  return updateObject(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder)
  });
};

const fetchOrdersSuccess = (state: OrderState, action: FetchOrdersSuccess) => {
  return updateObject(state, { orders: action.payload, loading: false });
};

const startLoading = (state: OrderState, action: PurchaseBurgerStart | FetchOrdersStart) => {
  return updateObject(state, { loading: true });
};

const stopLoading = (state: OrderState, action: PurchaseBurgerFail | FetchOrdersFailed) => {
  return updateObject(state, { loading: false });
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
      return purchaseInit(state, action);

    case ActionTypes.PURCHASE_BURGER_START:
    case ActionTypes.FETCH_ORDERS_START:
      return startLoading(state, action);

    case ActionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);

    case ActionTypes.PURCHASE_BURGER_FAIL:
    case ActionTypes.FETCH_ORDERS_FAILED:
      return stopLoading(state, action);

    case ActionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);

    default:
      return state;
  }
};

export default orderReducer;
