import React from 'react'
import Person from './Person'

const Persons = props => {
	const personsToShow = props.persons.filter(person => person.visible === true)
	return (
		<div>
			<table>
				<tbody>
					{personsToShow.map(person => (
						<Person
							key={person.id}
							person={person}
							handleDeletePerson={props.handleDeletePerson(person.id)}
						/>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Persons
