import React from 'react'
import { connect } from 'react-redux'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'
import { blogRemoval, blogLiking } from '../reducers/blogReducer'
import { commentCreation } from '../reducers/commentReducer'
import { Button, Form, Input, Label } from 'semantic-ui-react'

class Blog extends React.Component {
  deleteBlog = async blog => {
    await blogService.setToken(this.props.token)
    this.props.history.push('/')
    this.props.setNotification(`Blog '${blog.title}' was removed`, 5)
    this.props.blogRemoval(blog)
    console.log('blog removed')
  }

  likeBlog = async blog => {
    this.props.blogLiking(blog)
    this.props.setNotification(`You liked a blog '${blog.title}'`, 5)
  }

  addComment = async event => {
    event.preventDefault()
    const content = event.target.content.value
    console.log(content)
    event.target.content.value = ''
    this.props.commentCreation(this.props.blog, { content })
    this.props.setNotification(`Comment '${content}' was added`, 5)
  }

  render() {
    console.log('blog', this.props.blog)
    console.log('logged user', this.props.user)
    return (
      <div>
        {this.props.blog && (
          <div>
            <h2>{this.props.blog.title}</h2>
            <div>
              <a href={this.props.blog.url}>{this.props.blog.url}</a>
            </div>
            <div>{this.props.blog.likes} likes </div>
            <div>written by {this.props.blog.author}</div>
            <div>added by {this.props.blog.user.name}</div>
            <Button
              primary
              size="tiny"
              type="button"
              onClick={() => this.likeBlog(this.props.blog)}
            >
              Like blog
            </Button>
            {this.props.blog.user.username === this.props.user.username && (
              <Button
                warning
                type="button"
                onClick={() => {
                  this.deleteBlog(this.props.blog)
                }}
              >
                delete blog
              </Button>
            )}
            <div>
              <h3>Comments</h3>
              {this.props.comments.length < 1 && <div>No comments added</div>}
              <ul>
                {this.props.comments.length > 0 &&
                  this.props.comments.map(comment => <li key={comment._id}>{comment.content}</li>)}
              </ul>
              <Form onSubmit={this.addComment}>
                <label htmlFor="comment">Add comment:</label>
                <Input name="content" />
                <Button size="small" type="submit">
                  Add comment
                </Button>
              </Form>
            </div>
          </div>
        )}
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  console.log('blog ownprops', ownProps)
  return { blog: ownProps.blog, user: state.user }
}

export default connect(
  mapStateToProps,
  { setNotification, blogRemoval, blogLiking, commentCreation },
)(Blog)
