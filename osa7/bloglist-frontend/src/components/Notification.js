import React from 'react'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'

class Notification extends React.Component {
  render() {
    const style = {
      padding: 10,
      borderWidth: 1,
      marginBottom: 10,
    }
    return (
      <div>
        {this.props.notification && (
          <Message success floating style={style}>
            {this.props.notification}
          </Message>
       )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  notification: state.notification,
})

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification
