import { BurgerIngredientType } from '../../components/Burger/BurgerIngredient/BurgerIngredientType';
import { AddIngredient, RemoveIngredient, ActionTypes, SetIngredients, FetchIngredientsFailed } from './actionTypes';
import { BurgerBuilderIngredientsState } from '../../containers/BurgerBuilder/BurgerBuilderState';
import orders from '../../axios-orders';

export const addIngredient = (ingredientType: BurgerIngredientType): AddIngredient => {
  return {
     type: ActionTypes.ADD_INGREDIENT,
     payload: ingredientType 
  }
};

export const removeIngredient = (ingredientType: BurgerIngredientType): RemoveIngredient => {
  return {
     type: ActionTypes.REMOVE_INGREDIENT,
     payload: ingredientType 
  }
};

export const setIngredients = (ingredients: BurgerBuilderIngredientsState): SetIngredients => {
  return {
    type: ActionTypes.SET_INGREDIENTS,
    payload: ingredients
  }
};

export const fetchIngredientsFailed = (): FetchIngredientsFailed => {
  return {
    type: ActionTypes.FETCH_INGREDIENTS_FAILED,
  }
}

export const initializeIngredients = (): any => (dispatch: Function) => {
    orders.get('/ingredients')
      .then(response => dispatch(setIngredients(response.data)))
      .catch(err => dispatch(fetchIngredientsFailed()));
}
