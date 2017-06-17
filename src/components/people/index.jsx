import React, { Component } from 'react';
import { observer } from 'mobx-react'
import StoreInjector from '../middleware/StoreInjector';
import ActionsProvider from '../middleware/ActionsProvider';
import PeopleView from './PeopleView';
import * as actions from '../../actions/exampleActions';

@StoreInjector
@ActionsProvider
@observer
export default class PeoplePage extends Component {
	render() {
		return (
			<PeopleView {...this.props} />
		);
	}
}
