import React from 'react'

class App extends React.Component {
  getId = () => (100000 * Math.random()).toFixed(0)
  createAnecdote = event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    this.props.store.dispatch({
      type: 'CREATE_ANECDOTE',
      data: {
        content: content,
        id: this.getId(),
        votes: 0,
      },
    })
  }

  render() {
    const anecdotes = this.props.store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button
                onClick={() =>
                  this.props.store.dispatch({
                    type: 'VOTE_ANECDOTE',
                    data: {
                      id: anecdote.id,
                    },
                  })
                }
              >
                vote
              </button>
            </div>
          </div>
        ))}
        <h2>create new</h2>
        <form onSubmit={this.createAnecdote}>
          <div>
            <input name="anecdote" />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    )
  }
}

export default App
