import { Props } from '../../types/Props';
import { RouteChildrenProps } from 'react-router';

export interface CheckoutProps extends RouteChildrenProps, Props {
  ingredients: {
    [key: string]: number,
  },
  price: number,
}
