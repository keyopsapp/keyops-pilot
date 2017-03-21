import React, { Component } from 'react'
import { observer } from 'mobx-react'

@observer
export default class HomeView extends Component {
	render() {
		const { appStore } = this.props

		return (
			<div className="page home">
				<h1>Home Page, Yo!@@@</h1>

			</div>
		);
	}
}
