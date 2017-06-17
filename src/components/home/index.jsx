import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import StoreInjector from '../middleware/StoreInjector';
import HomeView from './HomeView';

@StoreInjector
@observer
export default class HomePage extends Component {
	render() {
		return (
			<HomeView {...this.props} />
		);
	}

}
