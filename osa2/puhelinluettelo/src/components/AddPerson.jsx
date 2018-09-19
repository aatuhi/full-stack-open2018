import React from 'react';

const AddPerson = props => {
	return (
		<div>
			{' '}
			<form onSubmit={props.handleAddPerson}>
				<div>
					Nimi:{' '}
					<input
						placeholder={'Syötä nimi'}
						value={props.newName}
						onChange={props.handleNameChange}
					/>
				</div>
				<div>
					Numero:{' '}
					<input
						placeholder={'Syötä puhelinnumero'}
						value={props.newNumber}
						onChange={props.handleNumberChange}
					/>
				</div>
				<div>
					<button type="submit">Lisää puhelinluetteloon!</button>
				</div>
			</form>
		</div>
	);
};

export default AddPerson;
