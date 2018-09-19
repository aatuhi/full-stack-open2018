import React from 'react';

const Osa = props => {
	console.log('Osa propsit', props);

	return (
		<div>
			{props.nimi}, {props.tehtavia} tehtävää
		</div>
	);
};

export default Osa;
