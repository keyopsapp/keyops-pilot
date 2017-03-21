import React, { Component } from 'react'
import { observer } from 'mobx-react'

@observer
export default class HomeView extends Component {
	render() {
		const { appStore } = this.props

		return (
			<div className="page home">
				<h1>These people are in the database.</h1>
				{appStore.people.map(person => {
					return (
						<h3 key={person.id}>{person.name}</h3>
					);
				})}
			</div>
		);
	}
}
