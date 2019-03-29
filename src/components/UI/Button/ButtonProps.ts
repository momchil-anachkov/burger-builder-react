import { Props } from '../../../types/Props';

export enum ButtonType {
  SUCCESS = 'Success',
  DANGER = 'Danger',
}

export interface ButtonProps extends Props {
  buttonType: ButtonType,
  disabled?: boolean,
  clicked: (event: any) => void;
}
