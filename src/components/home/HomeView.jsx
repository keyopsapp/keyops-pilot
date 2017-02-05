import React, { Component } from 'react'
import { observer } from 'mobx-react'

@observer
export default class HomeView extends Component {
	render() {
		const { store } = this.props

		return (
			<div className="page home">
				<h1>{store.welcomeMessage}</h1>
				<h2>{store.welcomeMessage}</h2>
				<h3>{store.welcomeMessage}</h3>
				<h4>{store.welcomeMessage}</h4>
				<p>{store.welcomeMessage}</p>
				<h5>{store.welcomeMessage}</h5>
				<h6>{store.welcomeMessage}</h6>
				<small>{store.welcomeMessage}</small>
			</div>
		);
	}
}
