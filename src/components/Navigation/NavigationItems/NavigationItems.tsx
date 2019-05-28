import React from 'react';
import classes from './NavigationItems.module.scss';
import NavigationItem from './NavigationItem/NavigationItem';
import { NavigationItemsProps } from './NavigationItems.props';

const NavigationItems = (props: NavigationItemsProps) => {
  let authNavigationItem = <NavigationItem link="/auth">Login</NavigationItem>;
  let ordersNavigationItem = null;

  if (props.isAuthenticated) {
    authNavigationItem = <NavigationItem link="/logout">Logout</NavigationItem>;
    ordersNavigationItem = <NavigationItem link="/orders">Orders</NavigationItem>;
  }

  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/">Burger Builder</NavigationItem>
      {ordersNavigationItem}
      {authNavigationItem}
    </ul>
  );
};

export default NavigationItems;
