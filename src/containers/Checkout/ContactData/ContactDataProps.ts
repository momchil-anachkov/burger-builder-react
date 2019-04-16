import { RouteChildrenProps } from 'react-router';
import { BurgerIngredientsMap } from '../../../components/Burger/BurgerIngredient/BurgerIngredientsMapType';

export interface ContactDataStateProps {
  ingredients: BurgerIngredientsMap,
  totalPrice: number,
}

export interface ContactDataOwnProps {
}

export interface ContactDataProps extends ContactDataStateProps, RouteChildrenProps {
}
