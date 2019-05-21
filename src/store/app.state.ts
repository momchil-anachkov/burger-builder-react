import { BurgerBuilderState } from './burger-builder.state';
import { OrderState } from './order.state';
import { AuthState } from './auth.state';

export interface AppState {
  burgerBuilder: BurgerBuilderState,
  order: OrderState,
  auth: AuthState,
}
