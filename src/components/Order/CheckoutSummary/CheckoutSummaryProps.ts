import { Props } from '../../../types/Props';
import { BurgerProps } from '../../Burger/BurgerProps';

export interface CheckoutSummaryProps extends Props, BurgerProps {
  cancelClicked: (event: any) => void;
  continueClicked: (event: any) => void;
}
