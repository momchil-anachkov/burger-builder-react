import { BurgerIngredientType } from '../../components/Burger/BurgerIngredient/BurgerIngredientType';
import { ActionTypes } from '../action-types';
import { AddIngredient, RemoveIngredient } from './actionTypes';

export const addIngredient = (ingredientType: BurgerIngredientType): AddIngredient => {
  return {
     type: ActionTypes.ADD_INGREDIENT,
     payload: ingredientType 
  }
}

export const removeIngredient = (ingredientType: BurgerIngredientType): RemoveIngredient => {
  return {
     type: ActionTypes.REMOVE_INGREDIENT,
     payload: ingredientType 
  }
}
