import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { BurgerIngredientType } from '../../components/Burger/BurgerIngredient/BurgerIngredientType';

class Checkout extends React.Component {
  state = {
    [BurgerIngredientType.SALAD]: 1,
    [BurgerIngredientType.CHEESE]: 1,
    [BurgerIngredientType.MEAT]: 1,
    [BurgerIngredientType.BACON]: 1,
  }

  render = () => {
    return (
      <div>
        <CheckoutSummary ingredients={ this.state }></CheckoutSummary>
      </div>
    );
  }
}

export default Checkout;
