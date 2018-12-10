import React from 'react'
import { connect } from 'react-redux'
import blogService from '../services/blogs'
import { setNotification } from '../reducers/notificationReducer'
import { blogRemoval, blogLiking } from '../reducers/blogReducer'
import { commentCreation } from '../reducers/commentReducer'
import commentService from '../services/comments'
import axios from 'axios'

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
            <button type="button" onClick={() => this.likeBlog(this.props.blog)}>
              like blog
            </button>
            {this.props.blog.user.username === this.props.user.username && (
              <button
                type="button"
                onClick={() => {
                  this.deleteBlog(this.props.blog)
                }}
              >
                delete blog
              </button>
            )}
            <div>
              <h3>Comments</h3>
              {this.props.comments.length < 1 && <div>No comments added</div>}
              <ul>
                {this.props.comments.length > 0 &&
                  this.props.comments.map(comment => <li key={comment._id}>{comment.content}</li>)}
              </ul>
              <form onSubmit={this.addComment}>
                <label htmlFor="comment">Add comment:</label>
                <input name="content" />
                <button type="submit">Add comment</button>
              </form>
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
