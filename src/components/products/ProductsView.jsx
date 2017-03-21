import React, { Component } from 'react'
import { observer } from 'mobx-react'

@observer
export default class ProductsView extends Component {
	render() {
		const { appStore } = this.props

		return (
			<div className="page product">
				<h1>Productzzz#z</h1>
			</div>
		);
	}
}
