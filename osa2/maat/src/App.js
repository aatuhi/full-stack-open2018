import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
	constructor() {
		super();
		this.state = { countries: [], search: '' };
	}

	componentDidMount() {
		console.log('component did mount');
		axios.get('https://restcountries.eu/rest/v2/all').then(response => {
			const countries = response.data;
			this.setState({ countries });
		});
	}

	handleSearch = event => {
		this.setState({ search: event.target.value });
		console.log(event.target.value);
	};

	handleClick = event => {
		event.preventDefault();
		console.log(event.target);
		console.log(this.state.countries[event.target.id].name);
		this.setState({ search: this.state.countries[event.target.id].name });
	};

	// kamalaa koodia, valitan!
	render() {
		console.log('render');

		let filteredCountries = this.state.countries.filter(country => {
			return country.name
				.toLowerCase()
				.includes(this.state.search.toLowerCase());
		});
		if (filteredCountries.length > 1) {
			return (
				<div>
					<input
						placeholder={'Search country...'}
						value={this.state.search}
						onChange={this.handleSearch}
					/>
					<div>
						<h3>Countries</h3>
						{filteredCountries.map(country => (
							<div
								id={filteredCountries.indexOf(country)}
								key={country.name}
								onClick={this.handleClick}
							>
								{country.name}
							</div>
						))}
					</div>
				</div>
			);
		} else if (filteredCountries.length === 1) {
			return (
				<div>
					<input
						placeholder={'Search country...'}
						value={this.state.search}
						onChange={this.handleSearch}
					/>
					<div>
						<h2>{filteredCountries[0].name}</h2>
						<img
							src={filteredCountries[0].flag}
							alt="filteredCountries[0].flag"
							height="90"
							width="140"
						/>
						<ul>
							<li>Capital: {filteredCountries[0].capital}</li>
							<li>Population: {filteredCountries[0].population}</li>
							<li>Area: {filteredCountries[0].area}</li>
						</ul>
					</div>
				</div>
			);
		}
		return (
			<input
				placeholder={'Search country...'}
				value={this.state.search}
				onChange={this.handleSearch}
			/>
		);
	}
}

export default App;
