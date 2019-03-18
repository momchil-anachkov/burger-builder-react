import React from 'react';

import classes from './BuildControls.module.scss';
import { BurgerIngredientType } from '../BurgerIngredient/BurgerIngredientType';
import BuildControl from '../BuildControl/BuildControl';
import { BuildControlsProps } from './BuildControlsProps';

const BuildControls = (props: BuildControlsProps) => {
  const controlsInfo: any[] = [
    { label: 'Salad', type: BurgerIngredientType.SALAD },
    { label: 'Bacon', type: BurgerIngredientType.BACON },
    { label: 'Cheese', type: BurgerIngredientType.CHEESE },
    { label: 'Meat', type: BurgerIngredientType.MEAT },
  ];

  return (
    <div className={classes.BuildControls} >
      <p>Current price: $<strong>{props.currentPrice.toFixed(2)}</strong></p>
      {
        controlsInfo.map((control) =>
          <BuildControl
            key={control.label}
            label={control.label}
            type={control.type}
            lessClickHandler={props.ingredientRemoved.bind(undefined, control.type)}
            moreClickHandler={props.ingredientAdded.bind(undefined, control.type)}
            disabled={props.disabledInfo[control.type]}
          />
        )
      }
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.orderNowClicked}
      >ORDER NOW</button>
    </div >
  );
}

export default BuildControls;
