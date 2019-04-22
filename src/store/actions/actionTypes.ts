import { Action } from 'redux';
import { ActionTypes } from '../action-types';
import { BurgerIngredientType } from '../../components/Burger/BurgerIngredient/BurgerIngredientType';

export class AddIngredient implements Action<string> {
  readonly type = ActionTypes.ADD_INGREDIENT;
  payload: BurgerIngredientType;

  constructor( payload: BurgerIngredientType ) { this.payload = payload; }
}

export class RemoveIngredient implements Action {
  readonly type = ActionTypes.REMOVE_INGREDIENT;
  payload: any;

  constructor( payload: any ) { this.payload = payload; }
}

export type IngredientActions = (AddIngredient | RemoveIngredient);

// export default IngredientActions;
