import { Props } from '../../../types/Props';

export enum InputType {
  INPUT = 'INPUT',
  TEXTAREA = 'TEXTAREA',
}

export interface InputProps extends Props {
  label: string;
  inputtype: InputType;
  [key: string]: any;
}
