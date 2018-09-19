import React from 'react';

const SearchPerson = props => {
	return (
		<div>
			Etsi puhelinluettelosta:{' '}
			<input
				placeholder={'Syötä nimi'}
				value={props.search}
				onChange={props.handleSearch}
			/>
		</div>
	);
};

export default SearchPerson;
