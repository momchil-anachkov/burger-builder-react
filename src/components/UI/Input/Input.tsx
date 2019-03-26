import React from 'react';
import { Props } from '../../../types/Props';
import { InputProps, InputType } from './InputProps';
import classes from './Input.module.scss';

const Input = (props: InputProps) => {
  let input;

  switch(props.inputtype) {
    case InputType.INPUT:
      input = <input className={classes.InputElement} {...props} />
      break;

    case InputType.TEXTAREA:
      input = <textarea className={classes.InputElement} {...props} />

    default:
      input = <input className={classes.InputElement} {...props} />
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {input}
    </div>
  );
};

export default Input;
