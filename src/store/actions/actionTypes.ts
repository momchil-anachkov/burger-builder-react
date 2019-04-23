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

export type IngredientActions = (
  AddIngredient |
  RemoveIngredient |
  SetIngredients |
  FetchIngredientsFail |
  PurchaseBurgerStart |
  PurchaseBurgerSuccess |
  PurchaseBurgerFail
);

// export default IngredientActions;
