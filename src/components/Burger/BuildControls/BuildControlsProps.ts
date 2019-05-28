export interface BuildControlsProps {
  isAuthenticated: boolean;
  currentPrice: number;
  disabledInfo: { [key:string]: boolean };
  purchasable: boolean;
  ingredientAdded: (event: any) => void;
  ingredientRemoved: (event: any) => void;
  orderNowClicked: (event: any) => void;
}
