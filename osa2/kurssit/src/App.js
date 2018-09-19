import React, { Component } from 'react';
import './App.css';
import Kurssi from './components/Kurssi';

class App extends Component {
	state = {
		kurssit: [
			{
				otsikko: 'Half Stack -sovelluskehitys',
				id: 1,
				osat: [
					{
						nimi: 'Reactin perusteet',
						tehtavia: 10,
						id: 1
					},
					{
						nimi: 'Tiedonvälitys propseilla',
						tehtavia: 7,
						id: 2
					},
					{
						nimi: 'Komponenttien tila',
						tehtavia: 14,
						id: 3
					}
				]
			},
			{
				otsikko: 'Node.js',
				id: 2,
				osat: [
					{
						nimi: 'Routing',
						tehtavia: 3,
						id: 1
					},
					{
						nimi: 'Middlewaret',
						tehtavia: 7,
						id: 2
					}
				]
			}
		]
	};
	render() {
		return (
			<div>
				<h1>Opetusohjelma</h1>
				{this.state.kurssit.map(kurssi => (
					<Kurssi kurssi={kurssi} />
				))}
			</div>
		);
	}
}

export default App;
