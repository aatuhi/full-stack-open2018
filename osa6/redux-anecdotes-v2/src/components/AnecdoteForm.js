import React from 'react'
import { connect } from 'react-redux'
import { anecdoteCreation } from './../reducers/anecdoteReducer'
import { setNotification } from './../reducers/notificationReducer'

class AnecdoteForm extends React.Component {
  handleSubmit = event => {
    event.preventDefault()
    this.props.anecdoteCreation(event.target.anecdote.value)
    this.props.setNotification(`You added an anecdote '${event.target.anecdote.value}'`)
    setTimeout(() => this.props.setNotification(null), 5000)
    event.target.anecdote.value = ''
  }

  render() {
    return (
      <div>
        <h2>Create new (programming) anecdote</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input name="anecdote" />
          </div>
          <button>Create</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = {
  anecdoteCreation,
  setNotification,
}

const ConnectedAnecdoteForm = connect(
  null,
  mapDispatchToProps,
)(AnecdoteForm)

export default ConnectedAnecdoteForm
