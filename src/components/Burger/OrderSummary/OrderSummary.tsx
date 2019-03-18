import React from 'react';
import { OrderSummaryProps } from './OrderSummaryProps';
import Button from '../../UI/Button/Button';
import { ButtonType } from '../../UI/Button/ButtonProps';

class OrderSummary extends React.Component<OrderSummaryProps> {
  componentDidUpdate = () => {
    console.log('[OrderSummary] componentDidUpdate')
  }

  render = () => {
    const ingredientsSummary = Object.keys(this.props.ingredients)
      .map(ingredientKey => (
        <li key={ingredientKey}><span style={{ textTransform: 'capitalize' }}>{ingredientKey}:</span> <span>{this.props.ingredients[ingredientKey]}</span></li>
      ));

    return (
      <React.Fragment>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>
          {ingredientsSummary}
        </ul>
        <p><strong>Total price: ${this.props.totalPrice}</strong></p>
        <p>Continue to checkout?</p>
        <Button clicked={this.props.cancelOrderClicked} buttonType={ButtonType.DANGER}>CANCEL</Button>
        <Button clicked={this.props.continueOrderClicked} buttonType={ButtonType.SUCCESS}>CONTINUE</Button>
      </React.Fragment>
    );
  }
}

export default OrderSummary;
