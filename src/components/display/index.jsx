import React, { Component } from 'react';
import StoreInjector from '../middleware/StoreInjector';
import ActionsProvider from '../middleware/ActionsProvider';
import DisplayView from './DisplayView';

@StoreInjector
@ActionsProvider
export default class DisplayPage extends Component {
	render() {
		return (
			<DisplayView {...this.props} />
		);
	}
}
