import { BurgerIngredientType } from '../../components/Burger/BurgerIngredient/BurgerIngredientType';
import { AddIngredient, RemoveIngredient, ActionTypes, SetIngredients, FetchIngredientsFail } from './actionTypes';
import { BurgerBuilderIngredientsState } from '../../containers/BurgerBuilder/BurgerBuilderState';
import orders from '../../axios-orders';
import { ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';

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
  type: ActionTypes.FETCH_INGREDIENTS_FAIL
});

export const initializeIngredients = (): ThunkAction<void, {}, {}, SetIngredients | FetchIngredientsFail> => (dispatch) => {
  orders
    .get('/ingredients')
    .then((response) => dispatch(setIngredients(response.data)))
    .catch((err) => dispatch(fetchIngredientsFail()));
};
