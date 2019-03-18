import React, { Component } from 'react';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import classes from './App.module.scss';
import Layout from './hoc/Layout/Layout';

class App extends Component {
	state = {
		loaded: false,
	}

	componentDidMount = () => {
		this.setState({loaded: true});
	}

	render() {
		const classList = [classes.App];
		if (!this.state.loaded) {
			classList.push(classes.Preload)
		}

		return (
			<div className={classList.join(' ')}>
				<Layout>
          <BurgerBuilder></BurgerBuilder>
        </Layout>
			</div>
		);
	}
}

export default App;
