import React from 'react';
import { BackdropProps } from './BackdropProps';
import classes from './Backdrop.module.scss';

const Backdrop = (props: BackdropProps) => {
  const backdropClasList = [classes.Backdrop];
  if (props.show) {
    backdropClasList.push(classes.Shown)
  }

  return (
    <div className={backdropClasList.join(' ')} onClick={props.clicked}></div>
    // props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null
  );
};

export default Backdrop;
