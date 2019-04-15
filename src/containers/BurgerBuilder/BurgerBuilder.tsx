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
import { BurgerBuilderProps, BurgerBuilderDispatchProps } from './BurgerBuilderProps';
import { BurgerBuilderState as BurgerBuilderReduxState } from '../../store/burger-builder.state';
import { MapDispatchToPropsFunction, connect } from 'react-redux';
import { AddIngredient, RemoveIngredient, IngredientActions } from '../../store/actions';
import { BurgerIngredientProps } from '../../components/Burger/BurgerIngredient/BurgerIngredientProps';
import { Action, Dispatch } from 'redux';
import { ActionTypes } from '../../store/action-types';

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
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    error: false,
  };

  componentDidMount = () => {
    // orders.get('/ingredients')
    //   .then(response => this.setState({ ingredients: response.data }))
    //   .catch(err => this.setState({ error: true }));
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
    // this.props.history.push('/checkout');
    const queryParams = Object.keys(this.state.ingredients!)
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(`${this.state.ingredients![k]}`))
      // .join('&');

    queryParams.push(`totalPrice=${this.state.totalPrice}`);
    const queryString = queryParams.join('&');

    this.props.history.push({
      pathname: '/checkout',
      search: queryString
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
    if (this.props.ingredients) {
      const ingredientsMap = Object.entries(this.props.ingredients!);
      const disabledInfo: { [key: string]: boolean } = {};
      ingredientsMap.forEach(pair => disabledInfo[pair[0]] = pair[1] === 0);

      burger =
        <React.Fragment>
          <Burger ingredients={ this.props.ingredients! } />
          <BuildControls
            currentPrice={ this.state.totalPrice }
            disabledInfo={ disabledInfo }
            purchasable={ this.state.purchasable }
            // ingredientAdded={ this.addIngredientHandler }
            // ingredientRemoved={ this.removeIngredientHandler }
            ingredientAdded={ this.props.addIngredient }
            ingredientRemoved={ this.props.removeIngredient }
            orderNowClicked={ this.purchaseHandler }
          />
        </React.Fragment>
    }

    if (this.state.loading) {
      modalContent = <Spinner />
    } else if (this.props.ingredients) {
      modalContent =
        <OrderSummary
          ingredients={ this.props.ingredients }
          totalPrice={ this.state.totalPrice }
          cancelOrderClicked={ this.purchaseCanceledHandler }
          continueOrderClicked={ this.purchaseContinueHandler }
        />
    }

    return (
      <React.Fragment>
        <Modal show={ this.state.purchasing } backdropClicked={ this.purchaseCanceledHandler }>
          { modalContent }
        </Modal>
        { burger }
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: BurgerBuilderReduxState) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  }
}

const mapDispatchToProps: MapDispatchToPropsFunction<BurgerBuilderDispatchProps, BurgerIngredientProps> = (dispatch: Dispatch<IngredientActions>) => ({
  // addIngredient: (ingredientType: BurgerIngredientType) =>  dispatch(new AddIngredient(ingredientType)),
  addIngredient: (ingredientType: BurgerIngredientType) =>  {
    console.log(new AddIngredient(ingredientType));
    console.log({ type: ActionTypes.ADD_INGREDIENT, payload: ingredientType });
    dispatch({ type: ActionTypes.ADD_INGREDIENT, payload: ingredientType })
  },
  removeIngredient: (ingredientType: BurgerIngredientType) => dispatch(new RemoveIngredient(ingredientType)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withErrorHandler(
    BurgerBuilder,
    orders
  )
);
