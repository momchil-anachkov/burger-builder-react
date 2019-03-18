import React from 'react';
import { CheckoutSummaryProps } from './CheckoutSummaryProps';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import { ButtonType } from '../../UI/Button/ButtonProps';
import classes from './CheckoutSummary.module.scss';

const CheckoutSummary = (props: CheckoutSummaryProps) => {

  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div style={ { width: '100%', margin: 'auto' } }>
        <Burger ingredients={ props.ingredients }></Burger>
      </div>
      <Button clicked={()=>{}} buttonType={ ButtonType.DANGER } >CANCEL</Button>
      <Button clicked={()=>{}} buttonType={ ButtonType.SUCCESS }>CONTINUE</Button>
    </div>
  )
}

export default CheckoutSummary;
