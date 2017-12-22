import React, { Component } from 'react';
import StoreInjector from '../middleware/StoreInjector';
import ActionsProvider from '../middleware/ActionsProvider';
import ResultsView from './ResultsView';

@StoreInjector
@ActionsProvider
export default class ResultsPage extends Component {
	render() {
		return (
			<ResultsView {...this.props} />
		);
	}
}
