import { BurgerIngredientType } from '../../components/Burger/BurgerIngredient/BurgerIngredientType';
import { AddIngredient, RemoveIngredient, ActionTypes, SetIngredients, FetchIngredientsFail } from './actionTypes';
import { BurgerBuilderIngredientsState } from '../../containers/BurgerBuilder/BurgerBuilderState';
import { ActionCreator } from 'redux';

export const addIngredient = (ingredientType: BurgerIngredientType): AddIngredient => ({
  type: ActionTypes.ADD_INGREDIENT,
  payload: ingredientType
});

export const removeIngredient = (ingredientType: BurgerIngredientType): RemoveIngredient => ({
  type: ActionTypes.REMOVE_INGREDIENT,
  payload: ingredientType
});

export const setIngredients: ActionCreator<SetIngredients> = (ingredients: BurgerBuilderIngredientsState): SetIngredients => ({
  type: ActionTypes.SET_INGREDIENTS,
  payload: ingredients
});

export const fetchIngredientsFail = (): FetchIngredientsFail => ({
  type: ActionTypes.FETCH_INGREDIENTS_FAIL,
});

export const initializeIngredients = () => {
  return {
    type: ActionTypes.INITIALIZE_INGREDIENTS,
  }
};
