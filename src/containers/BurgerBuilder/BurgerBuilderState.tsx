export interface BurgerBuilderIngredientsState {
  [key: string]: number;
}

export interface BurgerBuilderState {
  loading: boolean;
  totalPrice: number;
  purchasable: boolean;
  purchasing: boolean;
  ingredients: BurgerBuilderIngredientsState;
}
