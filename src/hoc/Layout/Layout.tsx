import React from 'react';
import classes from './Layout.module.scss';
import { LayoutState } from './LayoutState';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends React.Component<{}, LayoutState> {
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
        {/* <div className={classes.main}>Toolbar, SideDrawer, Backdrop</div> */}
        <SideDrawer open={this.state.sideDrawerShown} backdropClicked={this.sideDrawerBackdropClickedHandler} />
        <Toolbar drawerToggleClicked={this.sideDrawerTogleHandler} />
        <main className={classes.Content}>{this.props.children}</main>
      </React.Fragment>
      // </Aux>
    );
  }
};

export default Layout;
