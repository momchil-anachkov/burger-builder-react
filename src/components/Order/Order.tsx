import React from 'react';
import { Props } from '../../types/Props';
import classes from './Order.module.scss';

const Order = (props: Props) => (
  <div className={classes.Order}>
    <p>Ingredients: Salad (1)</p>
    <p>Price: <strong>USD 5.45</strong></p>
  </div>
)

export default Order;
