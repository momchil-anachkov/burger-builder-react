import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.scss';
import Backdrop from '../../UI/Backdrop/Backdrop';
import { SideDrawerProps } from './SideDrawerProps';

const SideDrawer = (props: SideDrawerProps) => {
  let attachedClasses = [ classes.SideDrawer, classes.Close ];
  if (props.open) {
    attachedClasses = [ classes.SideDrawer, classes.Open ];
  }
  return (
    <React.Fragment>
      <Backdrop show={props.open} clicked={props.backdropClicked} />
      <div className={attachedClasses.join(' ')} onClick={props.backdropClicked}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuthenticated} />
        </nav>
      </div>
    </React.Fragment>
  );
};

export default SideDrawer;
