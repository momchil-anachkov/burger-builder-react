import React, { Component } from 'react';
import classes from './App.module.scss';
import Layout from './hoc/Layout/Layout';
import Checkout from './containers/Checkout/Checkout';
import { Switch, Route, withRouter, Redirect } from 'react-router';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { MapDispatchToProps, connect, MapStateToProps } from 'react-redux';
import { AppDispatchProps, AppProps, AppOwnProps, AppStateProps } from './App.props';
import { AuthOwnProps } from './containers/Auth/Auth.props';
import { authInit } from './store/actions/auth';
import { AppState } from './store/app.state';

class App extends Component<AppProps> {
  state = {
    loaded: false,
  };

  componentDidMount = () => {
    this.setState({ loaded: true });
    this.props.init!();
  };

  render() {
    const classList = [ classes.App ];
    if (!this.state.loaded) {
      classList.push(classes.Preload);
    }

    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />,
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/"></Redirect>
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />,
          <Route path="/orders" component={Orders} />,
          <Route path="/logout" component={Logout} />,
          <Route path="/auth" component={Auth} />,
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect from="/auth" to="/"></Redirect>
        </Switch>
      );
    }

    return (
      <div className={classList.join(' ')}>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps: MapStateToProps<AppStateProps, AppOwnProps, AppState> = (state: AppState) => ({
  isAuthenticated: state.auth.token !== null,
});

const mapDispatchToProps: MapDispatchToProps<AppDispatchProps, AuthOwnProps> = (dispatch: Function) => ({
  init: () => dispatch(authInit()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App) as any;
