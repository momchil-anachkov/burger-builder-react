import { BurgerIngredientsMap } from '../Burger/BurgerIngredient/BurgerIngredientsMapType';
import { Props } from '../../types/Props';

export interface OrderProps extends Props {
  ingredients: BurgerIngredientsMap,
  price: number,
}
