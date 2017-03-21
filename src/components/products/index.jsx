import React, { Component } from 'react';
import { inject, observer } from 'mobx-react'
import ProductsView from './ProductsView';

@inject("appStore") @observer
export default class ProductsPage extends Component {
	componentWillMount() {
		this.props.appStore.getVialProductCategories();
	}

	render() {
		return (
			<ProductsView {...this.props} />
		);
	}

}
