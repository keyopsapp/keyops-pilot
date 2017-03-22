import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import PeopleView from './PeopleView';
import * as actions from '../../actions/exampleActions';

@inject("exampleStore") @observer
export default class PeoplePage extends Component {
	componentWillMount() {
		actions.getPeople();
	}

	render() {
		return (
			<PeopleView {...this.props} />
		);
	}
}
