import React from 'react';
import classes from './Order.module.scss';
import { OrderProps } from './OrderProps';
import { BurgerIngredientType } from '../Burger/BurgerIngredient/BurgerIngredientType';

const Order = (props: OrderProps) => {
  const ingredients = Object.keys(props.ingredients)
    .map(key => {
      return {
        name: key,
        amount: props.ingredients[key]
      }
    });

  const ingredientOutput = ingredients.map((ingredient) => (
    <span
      key={ ingredient.name }
      style={ {
        textTransform: 'capitalize',
        display: 'inline-block',
        margin: '0 8px',
        border: '1px solid #ccc',
        padding: '5px'
      } }>{ ingredient.name } { ingredient.amount }</span>
  )
  )

  return (
    <div className={ classes.Order }>
      <p>{ ingredientOutput }</p>
      <p>Price: <strong>{ props.price.toFixed(2) }</strong></p>
    </div>
  );
}

export default Order;
