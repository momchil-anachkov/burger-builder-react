import { IngredientActions } from './actions';
import { BurgerIngredientType } from '../components/Burger/BurgerIngredient/BurgerIngredientType';
import { BurgerBuilderState } from './burger-builder.state';
import { ActionTypes } from './action-types';

const initialState = {
    ingredients: {
      [BurgerIngredientType.SALAD]: 0,
      [BurgerIngredientType.BACON]: 0,
      [BurgerIngredientType.MEAT]: 0,
      [BurgerIngredientType.CHEESE]: 0,
    },
    totalPrice: 4,
};

const INGREDIENT_PRICES: {
  [key: string]: number;
} = {
  [BurgerIngredientType.SALAD]: 0.5,
  [BurgerIngredientType.CHEESE]: 0.4,
  [BurgerIngredientType.MEAT]: 1.3,
  [BurgerIngredientType.BACON]: 0.7,
}


const reducer = (state: BurgerBuilderState = initialState, action: IngredientActions): BurgerBuilderState => {


  switch (action.type) {
    case ActionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: { 
          ...state.ingredients,
          [action.payload]: state.ingredients[action.payload] + 1,
        },
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload],
      };

    case ActionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload]: state.ingredients[action.payload] - 1,
        },
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload],
      };

    default:
      return state;
  }
}

export default reducer;
