import { Props } from '../../types/Props';
import { BurgerIngredientsMap } from './BurgerIngredient/BurgerIngredientsMapType';

export interface BurgerProps extends Props {
  ingredients: BurgerIngredientsMap
}
