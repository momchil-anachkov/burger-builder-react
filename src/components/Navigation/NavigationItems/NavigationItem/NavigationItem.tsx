import React from 'react';
import classes from './NavigationItem.module.scss';
import { NavigationItemProps } from './NavigationItemProps';
import { NavLink } from 'react-router-dom';

const NavigationItem = (props: NavigationItemProps) => (
  <li className={ classes.NavigationItem }>
    <NavLink to={ props.link } exact activeClassName={ classes.active }>{ props.children }</NavLink>
  </li>
);

export default NavigationItem;
