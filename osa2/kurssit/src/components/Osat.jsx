import React from 'react';
import Osa from './Osa';

const Osat = props => {
	console.log('Osat propsit', props);

	let tehtaviaYhteensa = props.osat.reduce(function(summa, osa) {
		console.log('summa', summa);
		return summa + osa.tehtavia;
	}, 0);

	return (
		<div>
			{props.osat.map(osa => (
				<Osa key={osa.id} nimi={osa.nimi} tehtavia={osa.tehtavia} />
			))}
			<p>Yhteensä {tehtaviaYhteensa} tehtävää</p>
		</div>
	);
};

export default Osat;
