import React from 'react'
import { connect } from 'react-redux'
import { anecdoteVoting } from './../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

class AnecdoteList extends React.Component {
  render() {
    const anecdotes = this.props.anecdotes
    const anecdotesToShow = anecdotes.filter(anecdote =>
      anecdote.content.includes(this.props.filter),
    )
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotesToShow
          .sort((a, b) => b.votes - a.votes)
          .map(anecdote => (
            <div key={anecdote.id}>
              <div>{anecdote.content}</div>
              <div>
                has {anecdote.votes}
                <button
                  type="button"
                  onClick={() => {
                    this.props.anecdoteVoting(anecdote.id)
                    this.props.setNotification(`You voted '${anecdote.content}'`)
                    setTimeout(() => this.props.setNotification(null), 5000)
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

const mapStateToProps = state => ({
  anecdotes: state.anecdotes,
  filter: state.filter,
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
