import React from 'react';
import classes from './Burger.module.scss';
import { BurgerProps } from './BurgerProps';
import { BurgerIngredientType } from './BurgerIngredient/BurgerIngredientType';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props: BurgerProps) => {
  const ingredientKeys = Object.keys(props.ingredients);
  // const ingredients: any[] = [];
  // ingredientKeys.forEach((key) => {
  //   const ingredientType: BurgerIngredientType = key as any as BurgerIngredientType;
  //   const amount = props.ingredients[key];
  //   for (let i = 0; i < amount; i++) {
  //     ingredients.push(
  //       <BurgerIngredient key={key+i} type={ingredientType}></BurgerIngredient>
  //     );
  //   }
  // });

  const ingredients = ingredientKeys
    .map(key => {
      const ingredientType = key as any as BurgerIngredientType;
      return [...Array(props.ingredients[key])].map((item, index) => {
        return <BurgerIngredient key={key + index} type={ingredientType} />
      });
    })
    .reduce((accumulator, item) => accumulator.concat(item), []);

  const hasIngredients = ingredients.length !== 0;

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type={BurgerIngredientType.BREAD_TOP} />
      {hasIngredients ? ingredients : 'Please start adding ingredients!'}
      <BurgerIngredient type={BurgerIngredientType.BREAD_BOTTOM} />
    </div>
  );
}

export default Burger;
