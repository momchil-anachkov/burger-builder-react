import { Action } from 'redux';
import { BurgerIngredientType } from '../../components/Burger/BurgerIngredient/BurgerIngredientType';
import { BurgerBuilderIngredientsState } from '../../containers/BurgerBuilder/BurgerBuilderState';

export enum ActionTypes {
  ADD_INGREDIENT = 'ADD_INGREDIENT',
  REMOVE_INGREDIENT = 'REMOVE_INGREDIENT',
  SET_INGREDIENTS = 'SET_INGREDIENTS',
  FETCH_INGREDIENTS_FAILED = 'FETCH_INGREDIENTS_FAILED',
}

export interface AddIngredient extends Action<string> {
  type: ActionTypes.ADD_INGREDIENT;
  payload: BurgerIngredientType;
}

export interface RemoveIngredient extends Action<string> {
  type: ActionTypes.REMOVE_INGREDIENT;
  payload: BurgerIngredientType;
}

export interface SetIngredients extends Action<string> {
  type: ActionTypes.SET_INGREDIENTS;
  payload: BurgerBuilderIngredientsState;
}

export interface FetchIngredientsFailed extends Action<string> {
  type: ActionTypes.FETCH_INGREDIENTS_FAILED,
}

export type IngredientActions = (
  AddIngredient |
  RemoveIngredient |
  SetIngredients |
  FetchIngredientsFailed
);

// export default IngredientActions;
