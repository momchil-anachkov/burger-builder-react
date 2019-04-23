import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { CheckoutProps } from './CheckoutProps';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
import { BurgerBuilderState } from '../../store/burger-builder.state';
import { AppState } from '../../store/app.state';

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
      summary = (
        <React.Fragment>
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

const mapStateToProps = (state: AppState) => ({
  ingredients: state.burgerBuilder.ingredients!,
})

export default connect(mapStateToProps)(Checkout);
