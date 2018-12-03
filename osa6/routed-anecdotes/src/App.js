import React from 'react'
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom'
import { Container, Table, Form, Button, Grid, Menu, Image } from 'semantic-ui-react'

const bodyStyle = {
  fontSize: '20px',
}

const menuStyle = {
  fontSize: '15px',
  color: 'black',
  background: 'lightblue',
  borderStyle: 'hidden',
  borderRadius: '5px',
  marginBottom: '10px',
}

const footerStyle = {
  fontSize: '15px',
  background: '#C2C2C2',
  color: '#5E5E5E',
  borderStyle: 'hidden',
  borderRadius: '5px',
  padding: '10px',
  marginBottom: '10px',
  marginTop: '10px',
}

const notificationStyle = {
  color: 'darkgreen',
  background: 'lightgreen',
  borderStyle: 'hidden',
  borderRadius: '5px',
  padding: '10px',
  marginBottom: '10px',
}

const MenuBar = () => (
  <Menu style={menuStyle}>
    <Menu.Item link>
      <NavLink exact to="/">
        Anecdotes
      </NavLink>
    </Menu.Item>
    &nbsp;
    <Menu.Item link>
      <NavLink exact to="/create">
        Create
      </NavLink>
    </Menu.Item>
    &nbsp;
    <Menu.Item link>
      <NavLink exact to="/about">
        About
      </NavLink>
    </Menu.Item>
  </Menu>
)

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped celled>
      <Table.Body>
        {anecdotes.map(anecdote => (
          <Table.Row key={anecdote.id}>
            <Table.Cell>
              <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  </div>
)

const Anecdote = ({ anecdote }) => (
  <div>
    <h2>{anecdote.content}</h2>
    <p>has {anecdote.votes} votes</p>
    <p>
      for more info see <a href={anecdote.info}>{anecdote.info}</a>
    </p>
  </div>
)

const About = () => (
  <Grid columns={2}>
    <Grid.Row>
      <Grid.Column>
        <div>
          <h2>About anecdote app</h2>
          <p>According to Wikipedia:</p>

          <em>
            An anecdote is a brief, revealing account of an individual person or an incident.
            Occasionally humorous, anecdotes differ from jokes because their primary purpose is not
            simply to provoke laughter but to reveal a truth more general than the brief tale
            itself, such as to characterize a person by delineating a specific quirk or trait, to
            communicate an abstract idea about a person, place, or thing through the concrete
            details of a short narrative. An anecdote is "a story with a point."
          </em>

          <p>
            Software engineering is full of excellent anecdotes, at this app you can find the best
            and add more.
          </p>
        </div>
      </Grid.Column>
      <Grid.Column>
        <Image
          src="http://cdn.facesofopensource.com/wp-content/uploads/2017/07/23193718/brendaneich25563.web_.jpg"
          alt="käpistelijä"
          size="medium"
          rounded
        />
      </Grid.Column>
    </Grid.Row>
  </Grid>
)

const Footer = () => (
  <div style={footerStyle}>
    Anecdote app for{' '}
    <a href="https://courses.helsinki.fi/fi/TKT21009/121540749">Full Stack -sovelluskehitys</a>. See{' '}
    <a href="https://github.com/mluukkai/routed-anecdotes">
      https://github.com/mluukkai/routed-anecdotes
    </a>{' '}
    for the source code.
  </div>
)

const Notification = ({ notification }) => (
  <div>{notification && <div style={notificationStyle}>{notification}</div>}</div>
)

class CreateNew extends React.Component {
  constructor() {
    super()
    this.state = {
      content: '',
      author: '',
      info: '',
    }
  }

  handleChange = e => {
    console.log(e.target.name, e.target.value)
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.addNew({
      content: this.state.content,
      author: this.state.author,
      info: this.state.info,
      votes: 0,
    })
    this.props.history.push('/')
  }

  render() {
    return (
      <div>
        <h2>create a new anecdote</h2>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Anecdote</label>
            <input name="content" value={this.state.content} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <label>Author</label>
            <input name="author" value={this.state.author} onChange={this.handleChange} />
          </Form.Field>
          <Form.Field>
            <label>URL for more info</label>
            <input name="info" value={this.state.info} onChange={this.handleChange} />
          </Form.Field>
          <Button type="submit">create</Button>
        </Form>
      </div>
    )
  }
}

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      anecdotes: [
        {
          content: 'If it hurts, do it more often',
          author: 'Jez Humble',
          info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
          votes: 0,
          id: '1',
        },
        {
          content: 'Premature optimization is the root of all evil',
          author: 'Donald Knuth',
          info: 'http://wiki.c2.com/?PrematureOptimization',
          votes: 0,
          id: '2',
        },
      ],
      notification: null,
    }
  }

  addNew = anecdote => {
    console.log('called')
    anecdote.id = (Math.random() * 10000).toFixed(0)
    this.setState({
      anecdotes: this.state.anecdotes.concat(anecdote),
      notification: `You added an anecdote ${anecdote.content}`,
    })
    setTimeout(() => this.setState({ notification: null }), 10000)
  }

  anecdoteById = id => this.state.anecdotes.find(a => a.id === id)

  vote = id => {
    const anecdote = this.anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }

    const anecdotes = this.state.anecdotes.map(a => (a.id === id ? voted : a))

    this.setState({ anecdotes })
  }

  render() {
    console.log(this.state)
    return (
      <Container>
        <Router>
          <div style={bodyStyle}>
            <h1>Software anecdotes</h1>
            <MenuBar />
            <Notification notification={this.state.notification} />
            <Route
              exact
              path="/"
              render={() => <AnecdoteList anecdotes={this.state.anecdotes} />}
            />
            <Route path="/about" render={() => <About />} />
            <Route
              path="/create"
              render={({ history }) => <CreateNew addNew={this.addNew} history={history} />}
            />
            <Route
              exact
              path="/anecdotes/:id"
              render={({ match }) => <Anecdote anecdote={this.anecdoteById(match.params.id)} />}
            />
            <Footer />
          </div>
        </Router>
      </Container>
    )
  }
}

export default App
