import React from 'react'
import blogService from './services/blogs'
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import NavigationBar from './components/NavigationBar'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import User from './components/User'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { userInitialization } from './reducers/userReducer'
import { blogCreation, blogInitialization, blogLiking } from './reducers/blogReducer'
import { userLoggingIn, userLoggingOut } from './reducers/loggedUserReducer'
import { commentInitialization } from './reducers/commentReducer'
import { Container } from 'semantic-ui-react'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      title: '',
      author: '',
      url: '',
    }
  }

  async componentDidMount() {
    console.log('component did mount')
    this.props.blogInitialization()
    this.props.userInitialization()
    this.props.commentInitialization()
  }

  handleFieldChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleLogin = async event => {
    event.preventDefault()
    const userCredentials = { username: this.state.username, password: this.state.password }
    try {
      this.props.userLoggingIn(userCredentials)
     // this.props.setNotification(`Welcome ${this.state.username}`, 5)
      this.setState({ username: '', password: '' })
    } catch (execption) {
      console.log('exception', execption)
      this.props.setNotification(`Something went wrong`, 5)
    }
  }

  handleLogout = async event => {
    event.preventDefault()
    this.props.userLoggingOut()
    this.props.setNotification('You logged out', 5)
  }

  createBlog = async event => {
    event.preventDefault()
    blogService.setToken(this.props.user.token)
    this.BlogForm.toggleVisibility()
    try {
      this.props.blogCreation({
        title: this.state.title,
        author: this.state.author,
        url: this.state.url,
      })
      this.props.setNotification(`Blog '${this.state.title}' by ${this.state.author} was added`, 5)
      this.setState({ title: '', author: '', url: '' })
    } catch (execption) {
      console.log(execption)
      this.props.setNotification('Could not create a blog', 5)
    }
  }

  userById = id => {
    return this.props.users.find(user => user._id === id)
  }

  blogById = id => {
    console.log('thispropsblogs', this.props.blogs)
    return this.props.blogs.find(blog => blog._id === id)
  }

  commentsByBlogId = id => {
    return this.props.comments.filter(comment => comment.blog._id === id)
  }

  render() {
    console.log('rendering')

    return (
      <Container>
        <Router>
          <div>
            <h1>Bloglist app</h1>
            {this.props.user && (
              <NavigationBar user={this.props.user} handleLogout={this.handleLogout} />
            )}
            <Notification />
            <Route
              exact
              path="/"
              render={() =>
                this.props.user === null ? (
                  <LoginForm
                    username={this.state.username}
                    password={this.state.password}
                    onFieldChange={this.handleFieldChange}
                    onLogin={this.handleLogin}
                  />
                ) : (
                  <div>
                    <Togglable buttonLabel="Create a new Blog" ref={c => (this.BlogForm = c)}>
                      <BlogForm
                        title={this.state.title}
                        author={this.state.author}
                        url={this.state.url}
                        onCreateBlog={this.createBlog}
                        onFieldChange={this.handleFieldChange}
                      />
                    </Togglable>
                  </div>
                )
              }
            />
            <Route exact path="/blogs" render={() => <BlogList />} />
            <Route
              exact
              path="/users/:id"
              render={({ match }) => <User user={this.userById(match.params.id)} />}
            />
            <Route exact path="/users" render={() => <UserList />} />
            <Route
              path="/blogs/:id"
              render={({ match, history }) => (
                <Blog
                  history={history}
                  blog={this.blogById(match.params.id)}
                  comments={this.commentsByBlogId(match.params.id)}
                  token={this.props.user.token}
                />
              )}
            />
          </div>
        </Router>
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users,
  blogs: state.blogs,
  user: state.user,
  comments: state.comments,
})

export default connect(
  mapStateToProps,
  {
    setNotification,
    userInitialization,
    blogInitialization,
    blogCreation,
    userLoggingIn,
    userLoggingOut,
    blogLiking,
    commentInitialization,
  },
)(App)
