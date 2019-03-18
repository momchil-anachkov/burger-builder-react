import React from 'react';
import burgerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.scss';

const Logo = () => (
  <div className={classes.Logo}>
    <img src={burgerLogo} alt="MyBurger"/>
  </div>
);

export default Logo;
