import { Props } from '../../../types/Props';

export interface InputProps extends Props {
  label: string;
  elementType: string;
  elementConfig: any;
  value: any;
  invalid: boolean;
  shouldValidate: boolean;
  changed: (event: any) => void;
}
