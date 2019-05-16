import { BurgerIngredientType } from '../../components/Burger/BurgerIngredient/BurgerIngredientType';
import { BurgerBuilderState, BurgerBuilderIngredients } from '../burger-builder.state';
import {
  IngredientActions,
  ActionTypes,
  AddIngredient,
  RemoveIngredient,
  SetIngredients,
  FetchIngredientsFail
} from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false
};

const INGREDIENT_PRICES: {
  [key: string]: number;
} = {
  [BurgerIngredientType.SALAD]: 0.5,
  [BurgerIngredientType.CHEESE]: 0.4,
  [BurgerIngredientType.MEAT]: 1.3,
  [BurgerIngredientType.BACON]: 0.7
};

const addIngredient = (state: BurgerBuilderState, action: AddIngredient) => {
  const updatedIngredient = { [action.payload]: state.ingredients![action.payload] + 1 };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload]
  };
  return updateObject(state, updatedState);
};

const removeIngredient = (state: BurgerBuilderState, action: RemoveIngredient) => {
  const updatedIngredient = { [action.payload]: state.ingredients![action.payload] - 1 };
  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
  const updatedState = {
    ingredients: updatedIngredients,
    totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload]
  };
  return updateObject(state, updatedState);
};

const setIngredients = (state: BurgerBuilderState, action: SetIngredients) => {
  return updateObject(state, {
    ingredients: action.payload,
    totalPrice: 4,
    error: false
  });
};

const fetchIngredientsFail = (state: BurgerBuilderState, action: FetchIngredientsFail) => {
  return updateObject(state, {
    error: true
  });
};

const burgerBuilderReducer = (
  state: BurgerBuilderState = initialState,
  action: IngredientActions
): BurgerBuilderState => {
  switch (action.type) {
    case ActionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);

    case ActionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);

    case ActionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);

    case ActionTypes.FETCH_INGREDIENTS_FAIL:
      return fetchIngredientsFail(state, action);

    default:
      return state;
  }
};

export default burgerBuilderReducer;
