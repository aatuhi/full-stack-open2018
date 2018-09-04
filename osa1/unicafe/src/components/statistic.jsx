import React, { Component } from "react";

class Statistic extends Component {
  render() {
    return (
      <tr>
        <td>{this.props.text}</td>
        <td>{this.props.value}</td>
      </tr>
    );
  }
}

export default Statistic;
