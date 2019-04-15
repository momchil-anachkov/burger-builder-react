import { RouteChildrenProps } from 'react-router';
import { BurgerIngredientType } from '../../components/Burger/BurgerIngredient/BurgerIngredientType';
import { BurgerBuilderState } from '../../store/burger-builder.state';

export interface BurgerBuilderProps extends RouteChildrenProps, BurgerBuilderDispatchProps, BurgerBuilderReduxProps {
}

export interface BurgerBuilderReduxProps extends BurgerBuilderState {
}

export interface BurgerBuilderDispatchProps {
  addIngredient: (ingredientType: BurgerIngredientType) => void;
  removeIngredient: (ingredientType: BurgerIngredientType) => void;
}
