import React from 'react'
import { changeFilter } from './../reducers/filterReducer'
import { connect } from 'react-redux'

class Filterer extends React.Component {
  render() {
    return (
      <div>
        Filter anecdotes
        <input onChange={e => this.props.changeFilter(e.target.value)} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  filter: state.filter,
})

const mapDispatchToProps = {
  changeFilter,
}

const ConnectedFilterer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Filterer)

export default ConnectedFilterer
