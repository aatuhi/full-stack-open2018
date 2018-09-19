import React, { Component } from 'react'
import './App.css'
import Persons from './components/Persons'
import AddPerson from './components/AddPerson'
import SearchPerson from './components/SearchPerson'
import axios from 'axios'
import personService from './services/persons'
import Notification from './components/Notification'

class App extends Component {
	constructor() {
		super()
		this.state = {
			persons: [],
			newName: '',
			newNumber: '',
			search: '',
			message: null
		}
		console.log('constructor')
	}

	componentDidMount() {
		console.log('mounted')
		personService.getAll().then(response => {
			console.log('promise fulfilled')
			this.setState({ persons: response })
			console.log(this.state.persons)
		})
	}

	handleAddPerson = event => {
		event.preventDefault()
		const personObject = {
			name: this.state.newName,
			number: this.state.newNumber,
			id: this.state.persons[this.state.persons.length - 1].id + 1, // sama id nyt mahdoton
			visible: true
		}

		const names = this.state.persons.map(person => person.name.toLowerCase())

		if (!names.includes(personObject.name.toLowerCase())) {
			personService
				.create(personObject)
				.then(newPerson => {
					this.setState({
						persons: this.state.persons.concat(personObject),
						newName: '',
						newNumber: '',
						message: personObject.name + ' lisättiin'
					})
					setTimeout(() => {
						this.setState({ message: null })
					}, 3000)
				})
				.catch(error => console.log('error'))
		} else if (
			window.confirm('Päivitetäänkö "' + personObject.name + '" numero?')
		) {
			personService
				.update(
					names.indexOf(personObject.name.toLowerCase()) + 1,
					personObject
				)
				.then(updatedPerson => {
					console.log('update response data', updatedPerson)
					this.setState({
						persons: this.state.persons.map(
							person =>
								person.name.toLowerCase() !== personObject.name.toLowerCase()
									? person
									: updatedPerson
						),
						newName: '',
						newNumber: '',
						message: updatedPerson.name + ' päivitettiin'
					})
					setTimeout(() => {
						this.setState({ message: null })
					}, 3000)
					console.log('state updated')
				})
				.catch(error => {
					console.log('trying to update removed item')
					return personService
						.create(personObject)
						.then(newPerson => {
							this.setState({
								persons: this.state.persons.concat(personObject),
								newName: '',
								newNumber: '',
								message:
									'Yritit päivittää poistettua henkilöä! ' +
									personObject.name +
									' luotiin uudelleen '
							})
							setTimeout(() => {
								this.setState({ message: null })
							}, 3000)
						})
						.catch(error => console.log('error'))
				})
		}
		console.log('state after updating', this.state)
	}

	handleDeletePerson = id => {
		return () => {
			const person = this.state.persons.find(person => person.id === id)
			console.log('attempting to delete', person.name)

			axios
				.delete('http://localhost:3001/persons/' + id)
				.then(response => {
					this.setState({
						persons: this.state.persons.filter(person => person.id !== id),
						message: person.name + ' poistettiin'
					})
					setTimeout(() => {
						this.setState({ message: null })
					}, 3000)
				})
				.catch(error => {
					console.log('delete failed')
					this.setState({
						message: 'ERROR!!!!!!! päivitä sivu!'
					})
					setTimeout(() => {
						this.setState({ message: null })
					}, 3000)
				})
		}
	}

	handleNameChange = event => {
		this.setState({ newName: event.target.value })
	}

	handleNumberChange = event => {
		this.setState({ newNumber: event.target.value })
	}

	// tuskin kovin hyvin implementoitu?
	handleSearch = event => {
		this.setState({ search: event.target.value })
		console.log(event.target.value)
		const persons = this.state.persons

		persons.forEach(
			person =>
				person.name.toLowerCase().includes(event.target.value.toLowerCase())
					? (person.visible = true)
					: (person.visible = false)
		)

		console.log(persons)
	}

	render() {
		console.log('rendering')
		return (
			<div>
				<h2>Puhelinluettelo</h2>
				<Notification message={this.state.message} />
				<div>
					<SearchPerson
						search={this.state.search}
						handleSearch={this.handleSearch}
					/>
				</div>
				<h3>Lisää uusi</h3>
				<AddPerson
					handleAddPerson={this.handleAddPerson}
					newName={this.state.newName}
					handleNameChange={this.handleNameChange}
					newNumber={this.state.newNumber}
					handleNumberChange={this.handleNumberChange}
				/>
				<h3>Numerot</h3>
				<Persons
					persons={this.state.persons}
					handleDeletePerson={this.handleDeletePerson}
				/>
			</div>
		)
	}
}

export default App
