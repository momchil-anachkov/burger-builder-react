import { BurgerIngredientType } from '../../components/Burger/BurgerIngredient/BurgerIngredientType';
import { BurgerBuilderState } from '../burger-builder.state';
import { IngredientActions, ActionTypes } from '../actions/actionTypes';

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
    case ActionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: { 
          ...state.ingredients,
          [action.payload]: state.ingredients![action.payload] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload],
      };

    case ActionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload]: state.ingredients![action.payload] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload],
      };

    case ActionTypes.SET_INGREDIENTS:
      return {
        ...state,
        ingredients: action.payload,
        totalPrice: 4,
        error: false,
      }

    case ActionTypes.FETCH_INGREDIENTS_FAIL:
      return {
        ...state,
        error: true,
      }

    default:
      return state;
  }
}

export default burgerBuilderReducer;
