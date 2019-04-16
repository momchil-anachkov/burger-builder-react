export interface BurgerBuilderIngredientsState {
  [key: string]: number;
}

export interface BurgerBuilderState {
  loading: boolean;
  purchasing: boolean;
  ingredients?: BurgerBuilderIngredientsState;
  error: boolean;
}
