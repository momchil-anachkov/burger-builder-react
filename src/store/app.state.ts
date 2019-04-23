import { BurgerBuilderState } from './burger-builder.state';
import { OrderState } from './order.state';

export interface AppState {
  burgerBuilder: BurgerBuilderState,
  order: OrderState,
}
