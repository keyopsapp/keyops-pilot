import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Provider, observer } from 'mobx-react'
import LazyRoute from 'lazy-route'

import Navigation from './layout/Navigation';

@observer
export default class App extends Component {
	constructor(props) {
		super(props)
		this.stores = this.props.stores
	}

	render() {

		return (
			<Router>
				<Provider {...this.stores}>
					<div className="wrapper">
						<Navigation />
						<Route
						  exact
						  path="/"
						  render={(props) => <LazyRoute {...props} component={import('./home')} />}
						/>
						<Route
						  exact
						  path="/people"
						  render={(props) => <LazyRoute {...props} component={import('./people')} />}
						/>
					</div>
				</Provider>
			</Router>
		)
	}
}
