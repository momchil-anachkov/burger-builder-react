import React from 'react';
import classes from './NavigationItem.module.scss';
import { Props } from '../../../../types/Props';
import { NavigationItemProps } from './NavigationItemProps';

const NavigationItem = (props: NavigationItemProps) => (
  <li className={classes.NavigationItem}>
    <a
      href={props.link}
      className={props.active ? classes.active : undefined}
    >{props.children}</a>
  </li>
);

export default NavigationItem;
