import React from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      error: null,
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs => this.setState({ blogs }))

    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      this.setState({ user: JSON.parse(loggedUser) })
    }
  }

  onLoginFieldChange = event => {
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
      this.setState({ username: '', password: '', user })
      console.log('logged in')
      console.log(this.state)
    } catch (execption) {
      console.log(execption)
      this.setState({ error: 'invalid username or password ' })
      console.log(this.state.error)
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  onLogout = event => {
    event.preventDefault()
    this.setState({ user: null })
  }

  render() {
    return (
      <div>
        {this.state.user === null ? (
          <LoginForm
            username={this.state.username}
            password={this.state.password}
            onLoginFieldChange={this.onLoginFieldChange}
            onLogin={this.onLogin}
          />
        ) : (
          <div>
            {this.state.user.name} logged in
            <button type="button" onClick={this.onLogout}>
              Log out
            </button>
            <BlogList blogs={this.state.blogs} />
          </div>
        )}
      </div>
    )
  }
}

export default App
