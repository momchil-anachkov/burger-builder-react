import { Props } from '../../../types/Props';
import { BurgerIngredientType } from './BurgerIngredientType';

export interface BurgerIngredientProps extends Props {
  type: BurgerIngredientType;
}
