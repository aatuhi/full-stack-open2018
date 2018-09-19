import React from 'react';
import Otsikko from './Otsikko';
import Osat from './Osat';

const Kurssi = props => {
	console.log('Kurssin propsit', props);
	return (
		<div>
			<Otsikko otsikko={props.kurssi.otsikko} />
			<Osat osat={props.kurssi.osat} />
		</div>
	);
};

export default Kurssi;
