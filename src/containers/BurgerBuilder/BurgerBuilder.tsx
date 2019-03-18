import React from 'react';
import Burger from '../../components/Burger/Burger';
import { BurgerBuilderState, BurgerBuilderIngredientsState } from './BurgerBuilderState';
import { BurgerIngredientType } from '../../components/Burger/BurgerIngredient/BurgerIngredientType';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import orders from '../../axios-orders';

const INGREDIENT_PRICES: {
  [key: string]: number;
} = {
  [BurgerIngredientType.SALAD]: 0.5,
  [BurgerIngredientType.CHEESE]: 0.4,
  [BurgerIngredientType.MEAT]: 1.3,
  [BurgerIngredientType.BACON]: 0.7,
}

class BurgerBuilder extends React.Component<any, BurgerBuilderState> {
  public state: BurgerBuilderState = {
    ingredients: {
      [BurgerIngredientType.SALAD]: 0,
      [BurgerIngredientType.BACON]: 0,
      [BurgerIngredientType.CHEESE]: 0,
      [BurgerIngredientType.MEAT]: 0,
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
  };

  removeIngredientHandler = (type: BurgerIngredientType) => {
    const oldIngredientAmount = this.state.ingredients[type] as number;
    if (oldIngredientAmount > 0) {
      const updatedIngredientAmount = oldIngredientAmount - 1;
      const updatedIngredients = { ...this.state.ingredients };
      updatedIngredients[type] = updatedIngredientAmount;
      const priceToDeduct = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice - priceToDeduct;
      const purchasable = this.calculatePurchasable(updatedIngredients);
      this.setState({ ingredients: updatedIngredients, totalPrice: newPrice, purchasable });
    }
  }

  addIngredientHandler = (type: BurgerIngredientType) => {
    const oldIngredientAmount = this.state.ingredients[type] as number;
    const updatedIngredientAmount = oldIngredientAmount + 1;
    const updatedIngredients = { ...this.state.ingredients };
    updatedIngredients[type] = updatedIngredientAmount;
    const priceToAdd = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceToAdd;
    const purchasable = this.calculatePurchasable(updatedIngredients);
    this.setState({ ingredients: updatedIngredients, totalPrice: newPrice, purchasable });
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCanceledHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
    // this.setState({ purchasing: false });
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Momchil',
        email: 'some@fakemail.com',
        deliveryMethod: 'fastest',
        address: {
          street: '123 Main street',
          zipCode: '71239837192',
          country: 'Shanosville'
        }
      }
    }
    orders
      .post('/orders', order)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  }

  calculatePurchasable = (ingredients: BurgerBuilderIngredientsState): boolean => {
    const totalItems = Object.values(ingredients)
      .reduce((sum, currentAmount) => sum + currentAmount, 0);
    return totalItems !== 0;
  }

  render = () => {
    const ingredientsMap = Object.entries(this.state.ingredients);
    const disabledInfo: { [key: string]: boolean } = {};
    ingredientsMap.forEach(pair => disabledInfo[pair[0]] = pair[1] === 0);


    // let orderSummaryModal;
    // if (this.state.purchasing) {
    //   orderSummaryModal =
    //     <Modal>
    //       <OrderSummary ingredients={this.state.ingredients} />
    //     </Modal>;
    // }

    return (
      <React.Fragment>
        {/* {orderSummaryModal} */}
        <Modal show={this.state.purchasing} backdropClicked={this.purchaseCanceledHandler}>
          <OrderSummary
            ingredients={this.state.ingredients}
            totalPrice={this.state.totalPrice}
            cancelOrderClicked={this.purchaseCanceledHandler}
            continueOrderClicked={this.purchaseContinueHandler}
          />
        </Modal>;
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          currentPrice={this.state.totalPrice}
          disabledInfo={disabledInfo}
          purchasable={this.state.purchasable}
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          orderNowClicked={this.purchaseHandler}
        />
      </React.Fragment>
    )
  }
}

export default BurgerBuilder;
