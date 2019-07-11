import React, { useState } from 'react';
import classes from './Layout.module.scss';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { MapStateToProps, connect } from 'react-redux';
import { LayoutStateProps, LayoutOwnProps, LayoutProps } from './Layout.props';
import { AppState } from '../../store/app.state';

const Layout = (props: LayoutProps) => {
  const [sideDrawerShown, setSideDrawerShown] = useState(false);

  const sideDrawerToggleHandler = () => {
    setSideDrawerShown(!sideDrawerShown);
  }

  const sideDrawerBackdropClickedHandler = () => {
    setSideDrawerShown(false);
  }

  return (
    <React.Fragment>
      <SideDrawer isAuthenticated={ props.isAuthenticated } open={ sideDrawerShown } backdropClicked={ sideDrawerBackdropClickedHandler } />
      <Toolbar isAuthenticated={ props.isAuthenticated } drawerToggleClicked={ sideDrawerToggleHandler } />
      <main className={ classes.Content }>{ props.children }</main>
    </React.Fragment>
  );
}

const mapStateToProps: MapStateToProps<LayoutStateProps, LayoutOwnProps, AppState> = (state: AppState) => ({
  isAuthenticated: state.auth.token !== null,
});

export default connect(mapStateToProps)(Layout);
