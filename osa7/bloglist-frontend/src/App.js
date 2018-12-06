import React from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import UserList from './components/UserList'
import User from './components/User'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { setNotification } from './reducers/notificationReducer'
import { connect } from 'react-redux'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      blogs: [],
      username: '',
      password: '',
      user: null,
      title: '',
      author: '',
      url: '',
    }
  }

  async componentDidMount() {
    console.log('component did mount')
    const blogs = await blogService.getAll()
    blogs.sort((a, b) => b.likes - a.likes)
    this.setState({ blogs })

    const users = await userService.getAll()
    this.setState({ users })

    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      this.setState({ user: JSON.parse(loggedUser) })
    }
  }

  handleFieldChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password,
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })
      this.props.setNotification(`Welcome ${this.state.user.name}`, 5)
    } catch (execption) {
      console.log(execption)
      this.props.setNotification(`login unsuccesful`, 5)
    }
  }

  handleLogout = event => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    this.setState({ user: null })
    this.props.setNotification('logged out', 8)
  }

  // selectBlog = event => {
  //   console.log(event.target)

  // }

  handleBlogLike = async blog => {
    blogService.update(blog._id, { ...blog, likes: blog.likes + 1 })
    const updatedBlogs = await blogService.getAll()
    updatedBlogs.sort((a, b) => b.likes - a.likes)
    this.setState({ blogs: updatedBlogs })
  }

  createBlog = async event => {
    event.preventDefault()
    blogService.setToken(this.state.user.token)
    this.BlogForm.toggleVisibility()
    try {
      await blogService.create({
        title: this.state.title,
        author: this.state.author,
        url: this.state.url,
      })
      this.setState({ message: `Blog '${this.state.title}' by ${this.state.author} was added` })
      setTimeout(() => {
        this.setState({ message: null })
      }, 5000)
      this.setState({ title: '', author: '', url: '' })
    } catch (execption) {
      console.log(execption)
      this.setState({ error: true, message: 'unsuccesful' })
      setTimeout(() => {
        this.setState({ error: false, message: null })
      }, 5000)
    }
    const updatedBlogs = await blogService.getAll()
    this.setState({ blogs: updatedBlogs })
  }

  deleteBlog = async blog => {
    await blogService.setToken(this.state.user.token)
    await blogService.remove(blog._id)
    const updatedBlogs = await blogService.getAll()
    this.setState({ blogs: updatedBlogs })
    console.log('blog removed')
  }

  userById = id => {
    // userService.getAll().then(users => this.setState({ users }))

    return this.state.users.find(user => user._id === id)
  }

  blogById = id => {
    return this.state.blogs.find(blog => blog._id === id)
  }

  render() {
    console.log('rendering')
    console.log(this.state)
    return (
      <Router>
        <div>
          <h1>Bloglist app</h1>
          <Notification />
          <Route
            exact
            path="/"
            render={() =>
              this.state.user === null ? (
                <LoginForm
                  username={this.state.username}
                  password={this.state.password}
                  onFieldChange={this.handleFieldChange}
                  onLogin={this.handleLogin}
                />
              ) : (
                <div>
                  <div>
                    {this.state.user.name} logged in
                    <button type="button" onClick={this.handleLogout}>
                      Log out
                    </button>
                  </div>
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
          <Route exact path="/blogs" render={() => <BlogList blogs={this.state.blogs} />} />
          <Route
            exact
            path="/users/:id"
            render={({ match }) => <User user={this.userById(match.params.id)} />}
          />
          <Route exact path="/users" render={() => <UserList users={this.state.users} />} />
          <Route
            path="/blogs/:id"
            render={({ match }) => <Blog blog={this.blogById(match.params.id)} />}
          />
        </div>
      </Router>
    )
  }
}

export default connect(
  null,
  { setNotification },
)(App)
