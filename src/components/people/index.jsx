import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import PeopleView from './PeopleView';

@inject("appStore") @observer
export default class PeoplePage extends Component {
	componentWillMount() {
		this.props.appStore.getThePeople();
	}

	render() {
		return (
			<PeopleView {...this.props} />
		);
	}

}
