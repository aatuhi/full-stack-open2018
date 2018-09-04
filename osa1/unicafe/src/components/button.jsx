import React, { Component } from "react";

class Button extends Component {
  render() {
    return (
      <div>
        <button
          onClick={() => this.props.onIncrement(this.props.button)}
          className="btn btn-secondary btn-sm m-1"
        >
          {this.props.button.text}
        </button>
      </div>
    );
  }
}

export default Button;
