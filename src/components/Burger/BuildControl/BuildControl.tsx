import React from 'react';
import { BuildControlProps } from './BuildControlProps';
import classes from './BuildControl.module.scss';

const BuildControl = (props: BuildControlProps) => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button className={classes.Less} onClick={props.lessClickHandler} disabled={props.disabled}>Less</button>
    <button className={classes.More} onClick={props.moreClickHandler}>More</button>
  </div>
);

export default BuildControl;
