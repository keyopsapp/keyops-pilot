import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider, observer } from 'mobx-react';
import LazyRoute from 'lazy-route';

@observer
export default class App extends Component {
	constructor(props) {
		super(props);

		this.stores = this.props.stores;
	}

	render() {
		return (
			<Router>
				<Provider {...this.stores}>
					<div className="wrapper">
						<Route
							exact
							path="/"
							render={(props) => <LazyRoute {...props} component={System.import('./home/index')} />}
						/>
					</div>
				</Provider>
			</Router>
		)
	}
}
