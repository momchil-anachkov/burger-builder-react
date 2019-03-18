import React from 'react';
import { DrawerToggleProps } from './DrawerToggleProps';
import classes from './DrawerToggle.module.scss';

const DrawerToggle = (props: DrawerToggleProps) => {
  return (
    <div className={classes.DrawerToggle} onClick={props.clicked}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

export default DrawerToggle;
