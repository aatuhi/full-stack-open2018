import React, { Component } from "react";
import Statistic from "./statistic";

class Statistics extends Component {
  render() {
    if (this.props.calculateTotal() === 0) {
      return <p>Ei palautteita annettu</p>;
    }
    return (
      <div>
        <table>
          <col width="100" />
          <col width="100" />
          {this.props.buttons.map(button => (
            <Statistic
              key={button.id}
              text={button.text}
              value={button.value}
            />
          ))}
          <Statistic text={"Keskiarvo"} value={this.props.calculateMean()} />
          <Statistic
            text={"Positiivisia"}
            value={this.props.getPositiveProportion()}
          />
        </table>
      </div>
    );
  }
}

export default Statistics;
