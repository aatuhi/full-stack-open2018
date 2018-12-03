import React from 'react'
import { connect } from 'react-redux'
import { anecdoteVoting } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        {this.props.anecdotesToShow
          .sort((a, b) => b.votes - a.votes)
          .map(anecdote => (
            <div key={anecdote.id}>
              <div>{anecdote.content}</div>
              <div>
                has {anecdote.votes}
                <button
                  type="button"
                  onClick={() => {
                    this.props.anecdoteVoting(anecdote)
                    this.props.setNotification(`You voted '${anecdote.content}'`, 5)
                  }}
                >
                  vote
                </button>
              </div>
            </div>
          ))}
      </div>
    )
  }
}

const anecdotesToShow = (anecdotes, filter) => {
  return anecdotes.filter(anecdote => anecdote.content.includes(filter))
}

const mapStateToProps = state => ({
  anecdotesToShow: anecdotesToShow(state.anecdotes, state.filter),
})

const mapDispatchToProps = {
  setNotification,
  anecdoteVoting,
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnecdoteList)

export default ConnectedAnecdoteList
