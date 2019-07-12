import React, { useState, useEffect } from 'react';
import Burger from '../../components/Burger/Burger';
import { BurgerBuilderIngredientsState } from './BurgerBuilderState';
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

const BurgerBuilder = (props: BurgerBuilderProps) => {
  const [purchasing, setPurchasing] = useState(false);
  useEffect(() => {
    props.initializeIngredients();
  }, []);

  const purchaseHandler = () => {
    if (props.isAuthenticated) {
      setPurchasing(true);
    } else {
      props.purchaseInit();
      props.history.push(`/auth?redirect-to=/checkout`);
    }
  };

  const purchaseCanceledHandler = () => {
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    props.purchaseInit();
    props.history.push({
      pathname: '/checkout',
      // search: queryString
    });
  };

  const calculatePurchasable = (ingredients: BurgerBuilderIngredientsState): boolean => {
    const totalItems = Object.values(ingredients).reduce((sum, currentAmount) => sum + currentAmount, 0);
    return totalItems !== 0;
  };

  let modalContent;

  let burger = <Spinner />;

  let purchasable;

  if (props.error) {
    burger = <p>Ingredients couldn't be loaded</p>;
  }
  if (props.ingredients) {
    purchasable = calculatePurchasable(props.ingredients);
    const ingredientsMap = Object.entries(props.ingredients);
    const disabledInfo: { [key: string]: boolean } = {};
    ingredientsMap.forEach((pair) => (disabledInfo[pair[0]] = pair[1] === 0));

    burger = (
      <React.Fragment>
        <Burger ingredients={ props.ingredients } />
        <BuildControls
          currentPrice={ props.totalPrice }
          disabledInfo={ disabledInfo }
          purchasable={ purchasable }
          ingredientAdded={ props.addIngredient }
          ingredientRemoved={ props.removeIngredient }
          orderNowClicked={ purchaseHandler }
          isAuthenticated={ props.isAuthenticated }
        />
      </React.Fragment>
    );
  }

  if (props.ingredients) {
    modalContent = (
      <OrderSummary
        ingredients={ props.ingredients }
        totalPrice={ props.totalPrice }
        cancelOrderClicked={ purchaseCanceledHandler }
        continueOrderClicked={ purchaseContinueHandler }
      />
    );
  }

  return (
    <React.Fragment>
      <Modal show={ purchasing } backdropClicked={ purchaseCanceledHandler }>
        { modalContent }
      </Modal>
      { burger }
    </React.Fragment>
  );
};

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
