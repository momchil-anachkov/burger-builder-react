import { BurgerProps } from '../../../components/Burger/BurgerProps';
import { RouteChildrenProps } from 'react-router';

export interface ContactDataProps extends BurgerProps, RouteChildrenProps {
  totalPrice: number,
}
