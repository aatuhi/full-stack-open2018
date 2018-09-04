import React, { Component } from "react";
import NavBar from "./components/navbar";
import Buttons from "./components/buttons";
import "./App.css";
import Statistics from "./components/statistics";

class App extends Component {
  state = {
    buttons: [
      { id: 1, value: 0, text: "Hyvä" },
      { id: 2, value: 0, text: "Neutraali" },
      { id: 3, value: 0, text: "Huono" }
    ]
  };

  handleIncrement = button => {
    console.log(button);
    const buttons = [...this.state.buttons];
    const index = buttons.indexOf(button);
    buttons[index] = { ...button };
    buttons[index].value++;
    this.setState({ buttons });
  };

  calculateTotal = () => {
    const buttons = [...this.state.buttons];
    return buttons[0].value + buttons[1].value + buttons[2].value;
  };

  calculateMean = () => {
    const buttons = [...this.state.buttons];
    const x = (buttons[0].value - buttons[2].value) / this.calculateTotal();
    return Math.round(x * 10) / 10;
  };

  getPositiveProportion = () => {
    const x = (this.state.buttons[0].value / this.calculateTotal()) * 100;
    return Math.round(x) + "%";
  };

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container m-2">
          <h3>Anna palautetta</h3>
          <Buttons
            buttons={this.state.buttons}
            handleIncrement={this.handleIncrement}
          />
          <br />
          <h3>Statistiikka</h3>
          <Statistics
            buttons={this.state.buttons}
            calculateTotal={this.calculateTotal}
            calculateMean={this.calculateMean}
            getPositiveProportion={this.getPositiveProportion}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
