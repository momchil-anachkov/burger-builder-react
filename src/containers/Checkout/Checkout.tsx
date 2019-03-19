import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { BurgerIngredientType } from '../../components/Burger/BurgerIngredient/BurgerIngredientType';
import { CheckoutProps } from './CheckoutProps';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends React.Component<CheckoutProps> {
  state = {
    ingredients: {},
    price: 0
  }

  componentDidMount() {
    const queryParams = new URLSearchParams(this.props.location.search);
    const ingredients: any = {};
    let price: number = 0;
    for (let paramEntries of queryParams.entries()) {
      if (paramEntries[0] === 'totalPrice') {
        price = +paramEntries[1];
      } else {
        ingredients[paramEntries[0]] = +paramEntries[1];
      }
    }
    this.setState({ ingredients: ingredients, price: price });
  }

  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data')
  }

  render = () => {
    return (
      <div>
        <CheckoutSummary
          ingredients={ this.state.ingredients }
          cancelClicked={ this.checkoutCanceledHandler }
          continueClicked={ this.checkoutContinueHandler }
        />
        {/* <Route path={`${this.props.match!.url}/contact-data`} component={ContactData}></Route> */ }
        <Route
          path={ `${this.props.match!.url}/contact-data` }
          render={ (props) => <ContactData totalPrice={ this.state.price } ingredients={ this.state.ingredients } {...props}></ContactData> }>
        </Route>
      </div >
    );
  }
}

export default Checkout;
