import { BurgerIngredientType } from '../BurgerIngredient/BurgerIngredientType';

export interface BuildControlDataProps {
  label: string;
  type: BurgerIngredientType;
  disabled: boolean;
}


export interface BuildControlEventProps {
  moreClickHandler: (event: any) => void;
  lessClickHandler: (event: any) => void;
}

export interface BuildControlProps extends BuildControlDataProps, BuildControlEventProps {
};
