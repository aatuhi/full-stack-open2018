import React from 'react'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = { selected: false }
  }

  toggleSelected = () => {
    this.setState({ selected: !this.state.selected })
    console.log('toggled')
  }

  render() {
    const loggedUsername = this.props.currentUser.username
    const blogUsername = this.props.blog.user.username

    if (this.state.selected) {
      return (
        <li>
          <div className="blog-selected">
            <div onClick={this.toggleSelected}>
              <b>{this.props.blog.title}</b>
            </div>
            <div>by {this.props.blog.author}</div>
            <div>{this.props.blog.url}</div>
            <div>
              {this.props.blog.likes} likes{' '}
              <button onClick={() => this.props.onBlogLike(this.props.blog)}>like!</button>
            </div>
            <div>Added by {this.props.blog.user.name}</div>
            {loggedUsername === blogUsername && (
              <div>
                <button onClick={() => this.props.onDeleteBlog(this.props.blog)}>
                  delete blog
                </button>
              </div>
            )}
          </div>
        </li>
      )
    }
    return (
      <div onClick={this.toggleSelected} className="blog-unselected">
        <li className="title">
          {this.props.blog.title} {this.props.blog.author}
        </li>
      </div>
    )
  }
}

export default Blog
