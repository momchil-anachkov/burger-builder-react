import React, { Component } from 'react';
import classes from './App.module.scss';
import Layout from './hoc/Layout/Layout';
import Checkout from './containers/Checkout/Checkout';
import { Switch, Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

class App extends Component {
	state = {
		loaded: false,
	}

	componentDidMount = () => {
		this.setState({ loaded: true });
	}

	render() {
		const classList = [classes.App];
		if (!this.state.loaded) {
			classList.push(classes.Preload)
		}

		return (
			<div className={ classList.join(' ') }>
				<Layout>
					<Switch>
						<Route path="/checkout" component={ Checkout } ></Route>
						<Route path="/" exact component={ BurgerBuilder }></Route>
					</Switch>
				</Layout>
			</div>
		);
	}
}

export default App;
