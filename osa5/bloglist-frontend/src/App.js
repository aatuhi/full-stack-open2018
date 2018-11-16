import React from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

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
      error: null,
    }
  }

  componentDidMount() {
    console.log('component did mount')
    blogService.getAll().then(blogs => this.setState({ blogs }))

    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      this.setState({ user: JSON.parse(loggedUser) })
    }
  }

  onFieldChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  onLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password,
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })
    } catch (execption) {
      console.log(execption)
      this.setState({ error: 'invalid username or password ' })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  onLogout = event => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    this.setState({ user: null })
  }

  onCreateNewBlog = async event => {
    event.preventDefault()
    try {
      await blogService.create({
        title: this.state.title,
        author: this.state.author,
        url: this.state.url,
      })
      this.setState({ title: '', author: '', url: '' })
    } catch (execption) {
      console.log(execption)
      this.setState({ error: 'failed' })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
    const updatedBlogs = await blogService.getAll()
    this.setState({ blogs: updatedBlogs })
  }

  render() {
    console.log('rendering')
    // const newBlogForm = () => (
    //   <div>
    //     <h3>Create a new blog</h3>
    //     <form onSubmit={this.onCreateNewBlog}>
    //       <div>
    //         Title:
    //         <input type="text" name="title" onChange={this.onFieldChange} />
    //       </div>
    //       <div>
    //         Author:
    //         <input type="text" name="author" onChange={this.onFieldChange} />
    //       </div>
    //       <div>
    //         Url:
    //         <input type="text" name="url" onChange={this.onFieldChange} />
    //       </div>
    //       <button type="submit">Create</button>
    //     </form>
    //   </div>
    // )

    return (
      <div>
        {this.state.user === null ? (
          <LoginForm
            username={this.state.username}
            password={this.state.password}
            onFieldChange={this.onFieldChange}
            onLogin={this.onLogin}
          />
        ) : (
          <div>
            {this.state.user.name} logged in
            <button type="button" onClick={this.onLogout}>
              Log out
            </button>
            <BlogForm
              title={this.state.title}
              author={this.state.author}
              url={this.state.url}
              onCreateNewBlog={this.onCreateNewBlog}
              onFieldChange={this.onFieldChange}
            />
            <BlogList blogs={this.state.blogs} />
          </div>
        )}
      </div>
    )
  }
}

export default App
