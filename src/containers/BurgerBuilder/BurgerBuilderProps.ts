import { RouteChildrenProps } from 'react-router';
import { BurgerIngredientType } from '../../components/Burger/BurgerIngredient/BurgerIngredientType';
import { BurgerBuilderState } from '../../store/burger-builder.state';

export interface BurgerBuilderProps extends RouteChildrenProps, BurgerBuilderDispatchProps, BurgerBuilderStateProps {
}

export interface BurgerBuilderStateProps extends BurgerBuilderState {
  isAuthenticated: boolean;
}

export interface BurgerBuilderOwnProps {
}

export interface BurgerBuilderDispatchProps {
  addIngredient: (ingredientType: BurgerIngredientType) => void;
  removeIngredient: (ingredientType: BurgerIngredientType) => void;
  initializeIngredients: () => void;
  purchaseInit: () => void;
}
