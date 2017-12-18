import React, { Component } from 'react';
import StoreInjector from '../middleware/StoreInjector';
import ActionsProvider from '../middleware/ActionsProvider';
import EditorView from './EditorView';

@StoreInjector
@ActionsProvider
export default class EditorPage extends Component {
	render() {
		return (
			<EditorView {...this.props} />
		);
	}
}
