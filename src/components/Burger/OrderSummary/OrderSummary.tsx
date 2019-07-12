import React from 'react';
import { OrderSummaryProps } from './OrderSummaryProps';
import Button from '../../UI/Button/Button';
import { ButtonType } from '../../UI/Button/ButtonProps';

const OrderSummary = (props: OrderSummaryProps) => {
  const ingredientsSummary = Object.keys(props.ingredients)
    .map(ingredientKey => (
      <li key={ ingredientKey }><span style={ { textTransform: 'capitalize' } }>{ ingredientKey }:</span> <span>{ props.ingredients[ingredientKey] }</span></li>
    ));

  return (
    <React.Fragment>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>
        { ingredientsSummary }
      </ul>
      <p><strong>Total price: ${ props.totalPrice }</strong></p>
      <p>Continue to checkout?</p>
      <Button clicked={ props.cancelOrderClicked } buttonType={ ButtonType.DANGER }>CANCEL</Button>
      <Button clicked={ props.continueOrderClicked } buttonType={ ButtonType.SUCCESS }>CONTINUE</Button>
    </React.Fragment>
  );
}

export default OrderSummary;
