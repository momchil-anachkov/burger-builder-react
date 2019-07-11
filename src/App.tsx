import React, { Component, Suspense, useState, useEffect } from 'react';
import classes from './App.module.scss';
import Layout from './hoc/Layout/Layout';
import { Switch, Route, Redirect } from 'react-router';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import { MapDispatchToProps, connect, MapStateToProps } from 'react-redux';
import { AppDispatchProps, AppProps, AppOwnProps, AppStateProps } from './App.props';
import { AuthOwnProps } from './containers/Auth/Auth.props';
import { authInit } from './store/actions/auth';
import { AppState } from './store/app.state';

const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));
const Orders = React.lazy(() => import('./containers/Orders/Orders'));
const Auth = React.lazy(() => import('./containers/Auth/Auth'));

const app = (props: AppProps) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
      setLoaded(true);
      props.init!();
    }, []);

    const classList = [ classes.App ];
    if (!loaded) {
      classList.push(classes.Preload);
    }

    let routes = (
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/auth" component={Auth} />,
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to="/" />
        </Switch>
      </Suspense>
    );

    if (props.isAuthenticated) {
      routes = (
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/checkout" component={Checkout} />,
            <Route path="/orders" component={Orders} />,
            <Route path="/logout" component={Logout} />,
            <Route path="/auth" component={Auth} />,
            <Route path="/" exact component={BurgerBuilder} />
            <Redirect from="/auth" to="/" />
          </Switch>
        </Suspense>
      );
    }

    return (
      <div className={classList.join(' ')}>
        <Layout>{routes}</Layout>
      </div>
    );
}

const mapStateToProps: MapStateToProps<AppStateProps, AppOwnProps, AppState> = (state: AppState) => ({
  isAuthenticated: state.auth.token !== null,
});

const mapDispatchToProps: MapDispatchToProps<AppDispatchProps, AuthOwnProps> = (dispatch: Function) => ({
  init: () => dispatch(authInit()),
});

export default connect(mapStateToProps, mapDispatchToProps)(app) as any;
