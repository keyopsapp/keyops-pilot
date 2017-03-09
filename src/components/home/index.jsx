import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import HomeView from './HomeView';

@inject("appStore") @observer
export default class HomePage extends Component {
	componentWillMount() {
		const message = 'This Is Your Home Page';

		this.props.appStore.setWelcomeMessage(message);
	}

	render() {
		const { appStore } = this.props;

		return (
			<HomeView store={appStore} />
		);
	}

}
