import { ActionTypes, PurchaseBurgerSuccess, PurchaseBurgerFail, PurchaseBurgerStart } from '../actions';

const initialState = {
  orders: [],
  loading: false,
}

export const orderReducer = (state = initialState, action: PurchaseBurgerStart | PurchaseBurgerSuccess | PurchaseBurgerFail) => {
  switch (action.type) {
    case ActionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true,
      }
    case ActionTypes.PURCHASE_BURGER_SUCCESS:
      return {
        ...state,
        loading: false,
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
