import React, { Component } from 'react';
import Button from './button';

class Buttons extends Component {
	render() {
		return (
			<div className="row">
				{this.props.buttons.map(button => (
					<Button
						key={button.id}
						button={button}
						onIncrement={this.props.handleIncrement}
					/>
				))}
			</div>
		);
	}
}

export default Buttons;
