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

const reducer = (state: BurgerBuilderState = initialState, action: IngredientActions) => {


  switch (action.type) {
    case ActionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: { 
          ...state.ingredients,
          [action.payload]: state.ingredients[action.payload] + 1,
        }
      };

    case ActionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload]: state.ingredients[action.payload] - 1,
        }
      };

    default:
      return state;
  }
}

export default reducer;
