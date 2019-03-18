import { BurgerBuilderIngredientsState } from '../../../containers/BurgerBuilder/BurgerBuilderState';

export interface OrderSummaryProps {
  totalPrice: number;
  ingredients: BurgerBuilderIngredientsState,
  cancelOrderClicked: (event: any) => void,
  continueOrderClicked: (event: any) => void,
}
