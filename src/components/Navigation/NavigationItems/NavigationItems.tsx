import React from 'react';
import classes from './NavigationItems.module.scss';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = () => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/">Burger Builder</NavigationItem>
    {/* <NavigationItem link="/checkout">Checkout</NavigationItem> */}
    <NavigationItem link="/orders">Orders</NavigationItem>
    <NavigationItem link="/auth">Authenticate</NavigationItem>
  </ul>
);

export default NavigationItems;
