import { Props } from '../../types/Props';
import { RouteChildrenProps } from 'react-router';

export interface CheckoutStateProps {
  ingredients: null | {
    [key: string]: number;
  };
  purchased: boolean,
}

export interface CheckoutOwnProps {
  price: number,
}

export interface CheckoutProps extends CheckoutStateProps, CheckoutOwnProps, RouteChildrenProps, Props {
}
