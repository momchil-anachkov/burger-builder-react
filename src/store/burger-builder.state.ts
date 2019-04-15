export interface BurgerBuilderState {
  ingredients: {
    [key: string]: number;
  };
  totalPrice: number;
};
