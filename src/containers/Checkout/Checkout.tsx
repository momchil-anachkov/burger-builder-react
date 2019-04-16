import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { BurgerIngredientType } from '../../components/Burger/BurgerIngredient/BurgerIngredientType';
import { CheckoutProps } from './CheckoutProps';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
import { BurgerBuilderState } from '../../store/burger-builder.state';

class Checkout extends React.Component<CheckoutProps> {

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
          ingredients={ this.props.ingredients }
          cancelClicked={ this.checkoutCanceledHandler }
          continueClicked={ this.checkoutContinueHandler }
        />
        {/* <Route path={`${this.props.match!.url}/contact-data`} component={ContactData}></Route> */ }
        <Route
          path={ `${this.props.match!.url}/contact-data` }
          // render={ (props) => <ContactData totalPrice={ this.props.price } ingredients={ this.props.ingredients } {...props}></ContactData> }>
          component={ContactData}>
        </Route>
      </div >
    );
  }
}

const mapStateToProps = (state: BurgerBuilderState) => ({
  ingredients: state.ingredients,
  price: state.totalPrice,
})

export default connect(mapStateToProps)(Checkout);
