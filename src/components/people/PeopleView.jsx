import React, { Component } from 'react'
import { observer } from 'mobx-react'

@observer
export default class HomeView extends Component {
	componentDidMount() {
		this.props.actions2.getPeople();
	}

	render() {
		const { exampleStore } = this.props

		return (
			<div className="page home">
				<h1>These people are in the database.</h1>
				{exampleStore.people.map(person => {
					return (
						<h3 key={person.id}>{person.name}</h3>
					);
				})}
			</div>
		);
	}
}
