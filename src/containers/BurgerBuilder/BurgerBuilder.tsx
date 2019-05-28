import React from 'react';
import Burger from '../../components/Burger/Burger';
import { BurgerBuilderState, BurgerBuilderIngredientsState } from './BurgerBuilderState';
import { BurgerIngredientType } from '../../components/Burger/BurgerIngredient/BurgerIngredientType';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Spinner from '../../components/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {
  BurgerBuilderProps,
  BurgerBuilderDispatchProps,
  BurgerBuilderStateProps,
  BurgerBuilderOwnProps,
} from './BurgerBuilderProps';
import { MapDispatchToPropsFunction, connect, MapStateToProps } from 'react-redux';
import { BurgerIngredientProps } from '../../components/Burger/BurgerIngredient/BurgerIngredientProps';
import { addIngredient, removeIngredient, initializeIngredients } from '../../store/actions/burgerBuilder';
import { AppState } from '../../store/app.state';
import { purchaseInit } from '../../store/actions';
import axiosInstance from '../../axios';

class BurgerBuilder extends React.Component<BurgerBuilderProps, BurgerBuilderState> {
  public state: BurgerBuilderState = {
    purchasing: false,
  };

  componentDidMount = () => {
    this.props.initializeIngredients();
  };

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.purchaseInit();
      this.props.history.push(`/auth?redirect-to=/checkout`);
    }
  };

  purchaseCanceledHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.purchaseInit();
    this.props.history.push({
      pathname: '/checkout',
      // search: queryString
    });
  };

  calculatePurchasable = (ingredients: BurgerBuilderIngredientsState): boolean => {
    const totalItems = Object.values(ingredients).reduce((sum, currentAmount) => sum + currentAmount, 0);
    return totalItems !== 0;
  };

  render = () => {
    let modalContent;

    let burger = <Spinner />;

    let purchasable;

    if (this.props.error) {
      burger = <p>Ingredients couldn't be loaded</p>;
    }
    if (this.props.ingredients) {
      purchasable = this.calculatePurchasable(this.props.ingredients);
      const ingredientsMap = Object.entries(this.props.ingredients);
      const disabledInfo: { [key: string]: boolean } = {};
      ingredientsMap.forEach((pair) => (disabledInfo[pair[0]] = pair[1] === 0));

      burger = (
        <React.Fragment>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            currentPrice={this.props.totalPrice}
            disabledInfo={disabledInfo}
            purchasable={purchasable}
            ingredientAdded={this.props.addIngredient}
            ingredientRemoved={this.props.removeIngredient}
            orderNowClicked={this.purchaseHandler}
            isAuthenticated={this.props.isAuthenticated}
          />
        </React.Fragment>
      );
    }

    if (this.props.ingredients) {
      modalContent = (
        <OrderSummary
          ingredients={this.props.ingredients}
          totalPrice={this.props.totalPrice}
          cancelOrderClicked={this.purchaseCanceledHandler}
          continueOrderClicked={this.purchaseContinueHandler}
        />
      );
    }

    return (
      <React.Fragment>
        <Modal show={this.state.purchasing} backdropClicked={this.purchaseCanceledHandler}>
          {modalContent}
        </Modal>
        {burger}
      </React.Fragment>
    );
  };
}

const mapStateToProps: MapStateToProps<BurgerBuilderStateProps, BurgerBuilderOwnProps, AppState> = (
  state: AppState,
) => ({
  ingredients: state.burgerBuilder.ingredients,
  totalPrice: state.burgerBuilder.totalPrice,
  error: state.burgerBuilder.error,
  isAuthenticated: state.auth.token !== null,
});

const mapDispatchToProps: MapDispatchToPropsFunction<BurgerBuilderDispatchProps, BurgerIngredientProps> = (
  dispatch: any,
) => ({
  // addIngredient: (ingredientType: BurgerIngredientType) =>  dispatch(new AddIngredient(ingredientType)),
  addIngredient: (ingredientType: BurgerIngredientType) => {
    dispatch(addIngredient(ingredientType));
  },
  removeIngredient: (ingredientType: BurgerIngredientType) => {
    dispatch(removeIngredient(ingredientType));
  },
  initializeIngredients: () => {
    dispatch(initializeIngredients());
  },
  purchaseInit: () => {
    dispatch(purchaseInit());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axiosInstance));
