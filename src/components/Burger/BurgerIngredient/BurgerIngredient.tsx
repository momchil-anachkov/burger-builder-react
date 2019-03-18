import React from 'react';
import { BurgerIngredientProps } from './BurgerIngredientProps';
import { BurgerIngredientType } from './BurgerIngredientType';

import classes from './BurgerIngredient.module.scss';

const BurgerIngredient = (props: BurgerIngredientProps) => {
  let ingredient;

  switch (props.type) {
    case BurgerIngredientType.BREAD_BOTTOM:
      ingredient = <div className={classes.BreadBottom}></div>;
      break;

    case BurgerIngredientType.BREAD_TOP:
      ingredient =
        <div className={classes.BreadTop}>
          <div className={classes.Seeds1}></div>
          <div className={classes.Seeds2}></div>
        </div>;
      break;

    case BurgerIngredientType.MEAT:
      ingredient = <div className={classes.Meat}></div>
      break;

    case BurgerIngredientType.CHEESE:
      ingredient = <div className={classes.Cheese}></div>
      break;

    case BurgerIngredientType.SALAD:
      ingredient = <div className={classes.Salad}></div>
      break;

    case BurgerIngredientType.BACON:
      ingredient = <div className={classes.Bacon}></div>
      break;

    default: 
      throw new Error('Unhandled BurgerIngredientType');
  }

  return ingredient;
};

export default BurgerIngredient;
