import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { CheckoutProps, CheckoutOwnProps, CheckoutStateProps } from './CheckoutProps';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect, MapStateToProps } from 'react-redux';
import { AppState } from '../../store/app.state';

const Checkout = (props: CheckoutProps) => {
  const checkoutCanceledHandler = () => {
    props.history.goBack();
  }

  const checkoutContinueHandler = () => {
    props.history.replace('/checkout/contact-data')
  }

  let summary = <Redirect to="/" />
  if (props.ingredients) {
    const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;
    summary = (
      <React.Fragment>
        { purchasedRedirect }
        <CheckoutSummary
          ingredients={ props.ingredients }
          cancelClicked={ checkoutCanceledHandler }
          continueClicked={ checkoutContinueHandler }
        />
        <Route
          path={ `${props.match!.url}/contact-data` }
          component={ ContactData }>
        </Route>
      </React.Fragment>
    );
  }
  return (
    <div>
      { summary }
    </div >
  );
}

const mapStateToProps: MapStateToProps<CheckoutStateProps, CheckoutOwnProps, AppState> = (state: AppState) => ({
  ingredients: state.burgerBuilder.ingredients!,
  purchased: state.order.purchased
})

export default connect(mapStateToProps)(Checkout);
