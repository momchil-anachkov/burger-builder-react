import React from 'react';
import classes from './Layout.module.scss';
import { LayoutState } from './LayoutState';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { MapStateToProps, connect } from 'react-redux';
import { LayoutStateProps, LayoutOwnProps, LayoutProps } from './Layout.props';
import { AppState } from '../../store/app.state';

class Layout extends React.Component<LayoutProps, LayoutState> {
  state = {
    sideDrawerShown: false,
  }

  sideDrawerTogleHandler = () => {
    this.setState((previousState) => ({ sideDrawerShown: !previousState.sideDrawerShown }));
  }

  sideDrawerBackdropClickedHandler = () => {
    this.setState({ sideDrawerShown: false })
    this.sum(3,7);
  }

  sum(a: number, b: number) {
    return a+b;
  }

  render = () => {
    return (
      // <Aux>
      <React.Fragment>
        <SideDrawer isAuthenticated={this.props.isAuthenticated} open={this.state.sideDrawerShown} backdropClicked={this.sideDrawerBackdropClickedHandler} />
        <Toolbar isAuthenticated={this.props.isAuthenticated} drawerToggleClicked={this.sideDrawerTogleHandler} />
        <main className={classes.Content}>{this.props.children}</main>
      </React.Fragment>
    );
  }
}

const mapStateToProps: MapStateToProps<LayoutStateProps, LayoutOwnProps, AppState> = (state: AppState) => ({
  isAuthenticated: state.auth.token !== null,
});

export default connect(mapStateToProps)(Layout);
