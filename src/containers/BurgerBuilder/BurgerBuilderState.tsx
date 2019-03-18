export interface BurgerBuilderIngredientsState {
  [key: string]: number;
}

export interface BurgerBuilderState {
  totalPrice: number;
  purchasable: boolean;
  purchasing: boolean;
  ingredients: BurgerBuilderIngredientsState;
}
