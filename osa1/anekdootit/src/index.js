import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mostVoted: 0,
      selected: 0,
      votes: [0, 0, 0, 0, 0, 0]
    };
  }

  getRandomAnecdoteIndex = () => {
    const selected = Math.floor(
      Math.random() * Math.floor(this.props.anecdotes.length)
    );
    this.setState({ selected });
  };

  voteAnecdote = () => {
    const votes = [...this.state.votes];
    votes[this.state.selected]++;
    this.setState({ votes });
  };

  setMostVotedIndex = () => {
    const votes = [...this.state.votes];
    let value = votes[0];
    let mostVoted = 0;

    for (let i = 1; i < votes.length; i++) {
      if (votes[i] > value) {
        mostVoted = i;
        value = votes[i];
      }
    }
    this.setState({ mostVoted });
  };

  handleVote = () => {
    this.voteAnecdote();
    this.setMostVotedIndex();
  };

  handleNewAnecdote = () => {
    this.setMostVotedIndex();
    this.getRandomAnecdoteIndex();
  };

  render() {
    console.log(
      "selected",
      this.state.selected,
      "votes",
      this.state.votes[this.state.selected],
      "most voted",
      this.state.mostVoted
    );

    return (
      <div>
        <h3>'Random' anecdote:</h3>
        <i>{this.props.anecdotes[this.state.selected]}</i>
        <p>Votes: {this.state.votes[this.state.selected]}</p>
        <button onClick={this.handleNewAnecdote}>New anecdote</button>
        <button onClick={this.handleVote}>Vote!</button>
        <h3>Most popular anecdote:</h3>
        <i>{this.props.anecdotes[this.state.mostVoted]}</i>
        <p>Votes: {this.state.votes[this.state.mostVoted]}</p>
      </div>
    );
  }
}

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
