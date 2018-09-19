import React from 'react';

const Otsikko = props => {
	console.log('Otsikon propsit', props);
	return <h2>{props.otsikko}</h2>;
};

export default Otsikko;
