import React from 'react';
import Burger from '../../components/Burger/Burger';
import { BurgerBuilderState, BurgerBuilderIngredientsState } from './BurgerBuilderState';
import { BurgerIngredientType } from '../../components/Burger/BurgerIngredient/BurgerIngredientType';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Spinner from '../../components/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { BurgerBuilderProps, BurgerBuilderDispatchProps } from './BurgerBuilderProps';
import { BurgerBuilderState as BurgerBuilderReduxState } from '../../store/burger-builder.state';
import { MapDispatchToPropsFunction, connect } from 'react-redux';
import { BurgerIngredientProps } from '../../components/Burger/BurgerIngredient/BurgerIngredientProps';
import { Action, Dispatch } from 'redux';
import { IngredientActions } from '../../store/actions/actionTypes';
import { addIngredient, removeIngredient, initializeIngredients } from '../../store/actions/burgerBuilder';
import orders from '../../axios-orders';

class BurgerBuilder extends React.Component<BurgerBuilderProps, BurgerBuilderState> {
  public state: BurgerBuilderState = {
    purchasing: false,
  };

  componentDidMount = () => {
    this.props.initializeIngredients();
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCanceledHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
    // this.props.history.push('/checkout');
    // const queryParams = Object.keys(this.state.ingredients!)
    //   .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(`${this.state.ingredients![k]}`))
    //   // .join('&');

    // queryParams.push(`totalPrice=${this.props.totalPrice}`);
    // const queryString = queryParams.join('&');

    this.props.history.push({
      pathname: '/checkout',
      // search: queryString
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

    let purchasable

    if (this.props.error) {
      burger = <p>Ingredients couldn't be loaded</p>
    }
    if (this.props.ingredients) {
      purchasable = this.calculatePurchasable(this.props.ingredients);
      const ingredientsMap = Object.entries(this.props.ingredients);
      const disabledInfo: { [key: string]: boolean } = {};
      ingredientsMap.forEach(pair => disabledInfo[pair[0]] = pair[1] === 0);

      burger =
        <React.Fragment>
          <Burger ingredients={ this.props.ingredients } />
          <BuildControls
            currentPrice={ this.props.totalPrice }
            disabledInfo={ disabledInfo }
            purchasable={ purchasable }
            ingredientAdded={ this.props.addIngredient }
            ingredientRemoved={ this.props.removeIngredient }
            orderNowClicked={ this.purchaseHandler }
          />
        </React.Fragment>
    }

    if (this.props.ingredients) {
      modalContent =
        <OrderSummary
          ingredients={ this.props.ingredients }
          totalPrice={ this.props.totalPrice }
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
    totalPrice: state.totalPrice,
    error: state.error
  }
}

const mapDispatchToProps: MapDispatchToPropsFunction<BurgerBuilderDispatchProps, BurgerIngredientProps> = (dispatch: Dispatch<IngredientActions>) => ({
  // addIngredient: (ingredientType: BurgerIngredientType) =>  dispatch(new AddIngredient(ingredientType)),
  addIngredient: (ingredientType: BurgerIngredientType) => {
    dispatch(addIngredient(ingredientType));
  },
  removeIngredient: (ingredientType: BurgerIngredientType) => {
    dispatch(removeIngredient(ingredientType));
  },
  initializeIngredients: () => {
    dispatch(initializeIngredients())
  }
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
