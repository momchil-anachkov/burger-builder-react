import { Props } from '../../../types/Props';

export interface InputProps extends Props {
  label: string;
  elementType: string;
  elementConfig: any;
  value: any;
  changed: (event: any) => void;
}
