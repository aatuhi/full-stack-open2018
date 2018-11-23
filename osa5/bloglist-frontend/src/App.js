import React from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      title: '',
      author: '',
      url: '',
      message: null,
      error: false, // for notification styling
    }
  }

  componentDidMount() {
    console.log('component did mount')
    blogService
      .getAll()
      .then(blogs => blogs.sort((a, b) => b.likes - a.likes))
      .then(blogs => this.setState({ blogs }))

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
      this.setState({ error: false, message: `Welcome ${user.name}!` })
      setTimeout(() => {
        this.setState({ error: false, message: null })
      }, 3000)
    } catch (execption) {
      console.log(execption)
      this.setState({ error: true, message: 'invalid username or password ' })
      setTimeout(() => {
        this.setState({ error: false, message: null })
      }, 5000)
    }
  }

  handleLogout = event => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    this.setState({ user: null })
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

  render() {
    console.log('rendering')

    return (
      <div>
        <Notification message={this.state.message} error={this.state.error} />
        {this.state.user === null ? (
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
            <BlogList
              blogs={this.state.blogs}
              onDeleteBlog={this.deleteBlog}
              onBlogLike={this.handleBlogLike}
            />
          </div>
        )}
      </div>
    )
  }
}

export default App
