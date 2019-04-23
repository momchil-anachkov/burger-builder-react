import { RouteChildrenProps } from 'react-router';
import { BurgerIngredientsMap } from '../../../components/Burger/BurgerIngredient/BurgerIngredientsMapType';

export interface ContactDataStateProps {
  ingredients: BurgerIngredientsMap,
  totalPrice: number,
  loading: boolean,
}

export interface ContactDataDispatchProps {
  orderBurger: (orderData: any) => any;
}

export interface ContactDataOwnProps {
}

export interface ContactDataProps extends ContactDataStateProps, RouteChildrenProps, ContactDataDispatchProps, ContactDataOwnProps {
}
