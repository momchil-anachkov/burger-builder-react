import React from 'react';
import classes from './Toolbar.module.scss';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import { ToolbarProps } from './ToolbarProps';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const Toolbar = (props: ToolbarProps) => (
  <header className={classes.Toolbar}>
    <DrawerToggle clicked={props.drawerToggleClicked}></DrawerToggle>
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav>
      <NavigationItems></NavigationItems>
    </nav>
  </header>
);

export default Toolbar;
