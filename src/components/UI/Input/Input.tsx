import React from 'react';
import { Props } from '../../../types/Props';
import { InputProps } from './InputProps';
import classes from './Input.module.scss';

const Input = (props: InputProps) => {
  let input;
  const inputClasses = [classes.InputElement];

  if (props.invalid && props.shouldValidate){
    inputClasses.push(classes.Invalid);
  }

  switch(props.elementType) {
    case 'input':
    case 'email':
      input = (
        <input
          className={inputClasses.join(' ')}
          onChange={props.changed}
          {...props.elementConfig}
          value={props.value}
        />
      )
      break;

    case 'textarea':
      input = (
        <textarea
          className={inputClasses.join(' ')}
          onChange={props.changed}
          {...props.elementConfig}
          value={props.value}
        />
      )
      break

    case 'select':
      input = (
        <select
          className={inputClasses.join(' ')}
          onChange={props.changed}
          {...props.elementConfig}
          value={props.value}
        >
          {props.elementConfig.options.map((option: any) => (
            <option key={option.value} value={option.value}>{option.displayValue}</option>
          ))}
        </select>
      );
      break;

    default:
      input = (
        <input
          className={inputClasses.join(' ')}
          onChange={props.changed}
          {...props.elementConfig}
          value={props.value}
        />
      )
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {input}
    </div>
  );
};

export default Input;
