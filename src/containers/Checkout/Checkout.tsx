import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { CheckoutProps, CheckoutOwnProps, CheckoutStateProps } from './CheckoutProps';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { BurgerBuilderState } from '../../store/burger-builder.state';
import { AppState } from '../../store/app.state';
import { Dispatch } from 'redux';
import { PurchaseInit, purchaseInit } from '../../store/actions';

class Checkout extends React.Component<CheckoutProps> {

  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact-data')
  }

  render = () => {
    let summary = <Redirect to="/" />
    if (this.props.ingredients) {
      const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null;
      summary = (
        <React.Fragment>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={ this.props.ingredients }
            cancelClicked={ this.checkoutCanceledHandler }
            continueClicked={ this.checkoutContinueHandler }
          />
          <Route
            path={ `${this.props.match!.url}/contact-data` }
            component={ContactData}>
          </Route>
        </React.Fragment>
      );
    }
    return (
      <div>
        {summary}
      </div >
    );
  }
}

const mapStateToProps: MapStateToProps<CheckoutStateProps, CheckoutOwnProps, AppState> = (state: AppState) => ({
  ingredients: state.burgerBuilder.ingredients!,
  purchased: state.order.purchased
})

export default connect(mapStateToProps)(Checkout);
