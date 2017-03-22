import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import HomeView from './HomeView';

@inject("exampleStore") @observer
export default class HomePage extends Component {
	render() {
		return (
			<HomeView {...this.props} />
		);
	}

}
