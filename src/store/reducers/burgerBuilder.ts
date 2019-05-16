import { BurgerIngredientType } from '../../components/Burger/BurgerIngredient/BurgerIngredientType';
import { BurgerBuilderState, BurgerBuilderIngredients } from '../burger-builder.state';
import { IngredientActions, ActionTypes } from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
};

const INGREDIENT_PRICES: {
  [key: string]: number;
} = {
  [BurgerIngredientType.SALAD]: 0.5,
  [BurgerIngredientType.CHEESE]: 0.4,
  [BurgerIngredientType.MEAT]: 1.3,
  [BurgerIngredientType.BACON]: 0.7,
}


const burgerBuilderReducer = (state: BurgerBuilderState = initialState, action: IngredientActions): BurgerBuilderState => {

  switch (action.type) {
    case ActionTypes.ADD_INGREDIENT: {
      const updatedIngredient = { [action.payload]: state.ingredients![action.payload] + 1 };
      const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
      const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload],
      };
      return updateObject(state, updatedState);
    }

    case ActionTypes.REMOVE_INGREDIENT: {
      const updatedIngredient = { [action.payload]: state.ingredients![action.payload] - 1 };
      const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
      const updatedState = {
        ingredients: updatedIngredients,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload],
      };
      return updateObject(state, updatedState);
    }

    case ActionTypes.SET_INGREDIENTS:
      return updateObject(state, {
        ingredients: action.payload,
        totalPrice: 4,
        error: false
      });

    case ActionTypes.FETCH_INGREDIENTS_FAIL:
      return updateObject(state, {
        error: true
      });

    default:
      return state;
  }
};

export default burgerBuilderReducer;
