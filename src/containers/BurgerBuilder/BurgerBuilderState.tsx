export interface BurgerBuilderIngredientsState {
  [key: string]: number;
}

export interface BurgerBuilderState {
  purchasing: boolean;
  ingredients?: BurgerBuilderIngredientsState;
}
