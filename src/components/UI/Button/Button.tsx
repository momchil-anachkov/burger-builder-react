import React from 'react';
import classes from './Button.module.scss';
import { ButtonProps } from './ButtonProps';

const Button = (props: ButtonProps) => (
  <button
    disabled={props.disabled}
    className={[classes.Button, classes[props.buttonType]].join(' ')}
    onClick={props.clicked}
  >{props.children}</button>
);

export default Button;
