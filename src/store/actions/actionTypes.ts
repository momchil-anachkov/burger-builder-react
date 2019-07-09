import { Action } from 'redux';
import { BurgerIngredientType } from '../../components/Burger/BurgerIngredient/BurgerIngredientType';
import { BurgerBuilderIngredientsState } from '../../containers/BurgerBuilder/BurgerBuilderState';

export enum ActionTypes {
  ADD_INGREDIENT = 'ADD_INGREDIENT',
  REMOVE_INGREDIENT = 'REMOVE_INGREDIENT',
  SET_INGREDIENTS = 'SET_INGREDIENTS',
  FETCH_INGREDIENTS_FAIL = 'FETCH_INGREDIENTS_FAIL',

  PURCHASE_BURGER_START = 'PURCHASE_BURGER_START',
  PURCHASE_BURGER_SUCCESS = 'PURCHASE_BURGER_SUCCESS',
  PURCHASE_BURGER_FAIL = 'PURCHASE_BURGER_FAIL',

  PURCHASE_INIT = 'PURCHASE_INIT',

  FETCH_ORDERS_START = 'FETCH_ORDERS_START',
  FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS',
  FETCH_ORDERS_FAILED = 'FETCH_ORDERS_FAILED',

  AUTH_USER = 'AUTH_USER',
  AUTH_START = 'AUTH_START',
  AUTH_SUCCESS = 'AUTH_SUCCESS',
  AUTH_CHECK_TIMEOUT = 'AUTH_CHECK_TIMEOUT',
  AUTH_FAIL = 'AUTH_FAIL',
  AUTH_LOGOUT = 'AUTH_LOGOUT',
  AUTH_INITIATE_LOGOUT = 'AUTH_INITIATE_LOGOUT',
}

export interface AddIngredient extends Action<ActionTypes.ADD_INGREDIENT> {
  payload: BurgerIngredientType;
}

export interface RemoveIngredient extends Action<ActionTypes.REMOVE_INGREDIENT> {
  payload: BurgerIngredientType;
}

export interface SetIngredients extends Action<ActionTypes.SET_INGREDIENTS> {
  payload: BurgerBuilderIngredientsState;
}

export interface FetchIngredientsFail extends Action<ActionTypes.FETCH_INGREDIENTS_FAIL> {
}

export interface PurchaseBurgerStart extends Action<ActionTypes.PURCHASE_BURGER_START> {
}

export interface PurchaseBurgerSuccess extends Action<ActionTypes.PURCHASE_BURGER_SUCCESS> {
  payload: {
    orderId: string,
    orderData: any,
  },
}

export interface PurchaseBurgerFail extends Action<ActionTypes.PURCHASE_BURGER_FAIL> {
  payload: string,
}

export interface FetchOrdersStart extends Action<ActionTypes.FETCH_ORDERS_START> {
}

export interface FetchOrdersSuccess extends Action<ActionTypes.FETCH_ORDERS_SUCCESS> {
  payload: any[],
}

export interface FetchOrdersFailed extends Action<ActionTypes.FETCH_ORDERS_FAILED> {
  payload: Error,
}

export interface PurchaseInit extends Action<ActionTypes.PURCHASE_INIT> {
}

export interface AuthUser extends Action<ActionTypes.AUTH_USER> {
  payload: {
    email: string,
    password: string,
    isSignup: boolean
  }
}

export interface AuthStart extends Action<ActionTypes.AUTH_START> {
}

export interface AuthSuccess extends Action<ActionTypes.AUTH_SUCCESS> {
  payload: {
    idToken: string,
    userId: string,
  },
}

export interface AuthCheckTimeout extends Action<ActionTypes.AUTH_CHECK_TIMEOUT> {
  payload: {
    expiresIn: number,
  },
}

export interface AuthFail extends Action<ActionTypes.AUTH_FAIL> {
  payload: Error,
}

export interface AuthInitiateLogout extends Action<ActionTypes.AUTH_INITIATE_LOGOUT> {
}

export interface AuthLogout extends Action<ActionTypes.AUTH_LOGOUT> {
}

export type IngredientActions = (
  AddIngredient |
  RemoveIngredient |
  SetIngredients |
  FetchIngredientsFail |
  PurchaseBurgerStart |
  PurchaseBurgerSuccess |
  PurchaseBurgerFail |
  FetchOrdersStart |
  FetchOrdersSuccess |
  FetchOrdersFailed
);

export type AuthActions = (
  AuthStart |
  AuthSuccess |
  AuthCheckTimeout |
  AuthFail |
  AuthLogout |
  AuthInitiateLogout
);
