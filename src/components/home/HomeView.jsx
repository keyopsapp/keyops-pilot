import React, { Component } from 'react'
import { observer } from 'mobx-react'

@observer
export default class HomeView extends Component {
	render() {
		const { store } = this.props

		return (
			<div className="page home">
				<h1>{store.welcomeMessage}</h1>
			</div>
		);
	}
}
