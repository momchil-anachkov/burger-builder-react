export interface BurgerBuilderState {
  ingredients: null | {
    [key: string]: number;
  };
  totalPrice: number;
  error: boolean;
};
