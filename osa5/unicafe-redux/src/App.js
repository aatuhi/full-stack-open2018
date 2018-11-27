import React from 'react'
import Statistiikka from './components/Statistiikka'

class App extends React.Component {
  render() {
    console.log(this.props.store.getState())
    return (
      <div>
        <h2>Anna palautetta</h2>
        <button onClick={() => this.props.store.dispatch({ type: 'GOOD' })}>Hyvä</button>
        <button onClick={() => this.props.store.dispatch({ type: 'OK' })}>Neutraali</button>
        <button onClick={() => this.props.store.dispatch({ type: 'BAD' })}>Huono</button>
        <Statistiikka store={this.props.store} />
      </div>
    )
  }
}

export default App
