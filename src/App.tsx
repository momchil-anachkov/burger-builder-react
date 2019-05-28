import React, { Component } from 'react';
import classes from './App.module.scss';
import Layout from './hoc/Layout/Layout';
import Checkout from './containers/Checkout/Checkout';
import { Switch, Route } from 'react-router';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

class App extends Component {
  state = {
    loaded: false
  };

  componentDidMount = () => {
    this.setState({ loaded: true });
  };

  render() {
    const classList = [ classes.App ];
    if (!this.state.loaded) {
      classList.push(classes.Preload);
    }

    return (
      <div className={classList.join(' ')}>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/auth" component={Auth} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
