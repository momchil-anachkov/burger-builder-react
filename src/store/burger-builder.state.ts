export interface BurgerBuilderIngredients {
  [key: string]: number;
}

export interface BurgerBuilderState {
  ingredients: BurgerBuilderIngredients | null;
  totalPrice: number;
  error: boolean;
}
