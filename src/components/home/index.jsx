import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import HomeView from './HomeView';

@inject("appStore") @observer
export default class HomePage extends Component {
	componentWillMount() {
		this.props.appStore.getVialProductCategories();
	}

	render() {
		return (
			<HomeView {...this.props} />
		);
	}

}
