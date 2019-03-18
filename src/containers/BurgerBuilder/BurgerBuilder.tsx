import React from 'react';
import Burger from '../../components/Burger/Burger';
import { BurgerBuilderState, BurgerBuilderIngredientsState } from './BurgerBuilderState';
import { BurgerIngredientType } from '../../components/Burger/BurgerIngredient/BurgerIngredientType';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import orders from '../../axios-orders';
import Spinner from '../../components/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from 'axios';
import { BurgerBuilderProps } from './BurgerBuilderProps';

const INGREDIENT_PRICES: {
  [key: string]: number;
} = {
  [BurgerIngredientType.SALAD]: 0.5,
  [BurgerIngredientType.CHEESE]: 0.4,
  [BurgerIngredientType.MEAT]: 1.3,
  [BurgerIngredientType.BACON]: 0.7,
}

class BurgerBuilder extends React.Component<BurgerBuilderProps, BurgerBuilderState> {
  public state: BurgerBuilderState = {
    loading: false,
    ingredients: undefined,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    error: false,
  };

  componentDidMount = () => {
    orders.get('/ingredients')
      .then(response => this.setState({ ingredients: response.data }))
      .catch(err => this.setState({ error: true }));
  }

  removeIngredientHandler = (type: BurgerIngredientType) => {
    const oldIngredientAmount = this.state.ingredients![type] as number;
    if (oldIngredientAmount > 0) {
      const updatedIngredientAmount = oldIngredientAmount - 1;
      const updatedIngredients = { ...this.state.ingredients! };
      updatedIngredients[type] = updatedIngredientAmount;
      const priceToDeduct = INGREDIENT_PRICES[type];
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice - priceToDeduct;
      const purchasable = this.calculatePurchasable(updatedIngredients);
      this.setState({ ingredients: updatedIngredients, totalPrice: newPrice, purchasable });
    }
  }

  addIngredientHandler = (type: BurgerIngredientType) => {
    const oldIngredientAmount = this.state.ingredients![type] as number;
    const updatedIngredientAmount = oldIngredientAmount + 1;
    const updatedIngredients = { ...this.state.ingredients! };
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
    // const order = {
    //   ingredients: this.state.ingredients,
    //   price: this.state.totalPrice,
    //   customer: {
    //     name: 'Momchil',
    //     email: 'some@fakemail.com',
    //     deliveryMethod: 'fastest',
    //     address: {
    //       street: '123 Main street',
    //       zipCode: '71239837192',
    //       country: 'Shanosville'
    //     }
    //   }
    // }
    // this.setState({ loading: true });
    // orders
    //   .post('/orders', order)
    //   .then(response => {
    //     console.log(response)
    //     this.setState({ loading: false, purchasing: false });
    //   })
    //   .catch(error => {
    //     console.log(error)
    //     this.setState({ loading: false, purchasing: false });
    //   });
    // this.props.history.push('/checkout');
    var searchQuery = Object.keys(this.state.ingredients!)
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(`${this.state.ingredients![k]}`))
      .join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: searchQuery
    });
  }

  calculatePurchasable = (ingredients: BurgerBuilderIngredientsState): boolean => {
    const totalItems = Object.values(ingredients)
      .reduce((sum, currentAmount) => sum + currentAmount, 0);
    return totalItems !== 0;
  }

  render = () => {

    let modalContent;

    let burger = <Spinner />

    if (this.state.error) {
      burger = <p>Ingredients couldn't be loaded</p>
    }
    if (this.state.ingredients) {
      const ingredientsMap = Object.entries(this.state.ingredients!);
      const disabledInfo: { [key: string]: boolean } = {};
      ingredientsMap.forEach(pair => disabledInfo[pair[0]] = pair[1] === 0);

      burger =
        <React.Fragment>
          <Burger ingredients={ this.state.ingredients! } />
          <BuildControls
            currentPrice={ this.state.totalPrice }
            disabledInfo={ disabledInfo }
            purchasable={ this.state.purchasable }
            ingredientAdded={ this.addIngredientHandler }
            ingredientRemoved={ this.removeIngredientHandler }
            orderNowClicked={ this.purchaseHandler }
          />
        </React.Fragment>
    }

    if (this.state.loading) {
      modalContent = <Spinner />
    } else if (this.state.ingredients) {
      modalContent =
        <OrderSummary
          ingredients={ this.state.ingredients }
          totalPrice={ this.state.totalPrice }
          cancelOrderClicked={ this.purchaseCanceledHandler }
          continueOrderClicked={ this.purchaseContinueHandler }
        />
    }

    return (
      <React.Fragment>
        {/* {orderSummaryModal} */ }
        <Modal show={ this.state.purchasing } backdropClicked={ this.purchaseCanceledHandler }>
          { modalContent }
        </Modal>
        { burger }
      </React.Fragment>
    )
  }
}

export default withErrorHandler(BurgerBuilder, orders);
