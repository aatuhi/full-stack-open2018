import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonData: [
        {
          text: "Hyvä",
          counter: 0
        },
        {
          text: "Neutraali",
          counter: 0
        },
        {
          text: "Huono",
          counter: 0
        }
      ]
    };
  }

  handleGood = () => {
    this.setState({
      counterGood: this.state.counterGood + 1
    });
  };

  handleNeutral = () => {
    this.setState({
      counterNeutral: this.state.counterNeutral + 1
    });
  };

  handleBad = () => {
    this.setState({
      counterBad: this.state.counterBad + 1
    });
  };

  countMean = () => {
    let mean =
      (this.state.counterGood - this.state.counterBad) /
      (this.state.counterGood +
        this.state.counterBad +
        this.state.counterNeutral);
    return Math.round(mean * 100) / 100;
  };

  positiveProportion = () => {
    return Math.round(
      (this.state.counterGood /
        (this.state.counterGood +
          this.state.counterBad +
          this.state.counterNeutral)) *
        100
    );
  };

  render() {
    const t = this.state.buttonData;
    return (
      <div>
        <h1>Äidin tekemän ruoan palautesivu</h1>
        <h2>Anna palautetta</h2>
        <button onClick={this.handleGood}>Hyvä</button>
        <button onClick={this.handleNeutral}>Neutraali</button>
        <button onClick={this.handleBad}>Huono</button>
        <h2>Statistiikka</h2>
        <p>Hyvä: {this.state.counterGood}</p>
        <p>Neutraali: {this.state.counterNeutral}</p>
        <p>Huono: {this.state.counterBad}</p>
        <p>Keskiarvo: {this.countMean()}</p>
        <p>Positiivisia: {this.positiveProportion()} % </p>
        <Button handle={this.handleGood} name={t[0].text} />
      </div>
    );
  }
}

const Button = props => {
  return <button onClick={props.handle}> {props.name}</button>;
};

ReactDOM.render(<App />, document.getElementById("root"));
