import React from 'react';
import classes from './NavigationItems.module.scss';
import NavigationItem from './NavigationItem/NavigationItem';
import { NavigationItemsProps } from './NavigationItems.props';

const NavigationItems = (props: NavigationItemsProps) => {
  let authNavigationItem = <NavigationItem link="/auth">Authenticate</NavigationItem>;
  if (props.isAuthenticated) {
    authNavigationItem = <NavigationItem link="/logout">Logout</NavigationItem>;;
  }
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/">Burger Builder</NavigationItem>
      {/* <NavigationItem link="/checkout">Checkout</NavigationItem> */}
      <NavigationItem link="/orders">Orders</NavigationItem>
      {authNavigationItem}
    </ul>
  );
};

export default NavigationItems;
