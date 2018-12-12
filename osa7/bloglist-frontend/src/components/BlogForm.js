import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'

const BlogForm = props => {
  const formStyle = {
    marginTop: '10px',
  }
  return (
    <div style={formStyle}>
      <h3>Create a new blog</h3>
      <Form onSubmit={props.onCreateBlog}>
        <Form.Field>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" value={props.title} onChange={props.onFieldChange} />
        </Form.Field>
        <Form.Field>
          <label htmlFor="author">Author</label>
          <input type="text" name="author" value={props.author} onChange={props.onFieldChange} />
        </Form.Field>
        <Form.Field>
          <label htmlFor="url">Url</label>
          <input type="text" name="url" value={props.url} onChange={props.onFieldChange} />
        </Form.Field>
        <Button primary type="submit">
          Create
        </Button>
      </Form>
    </div>
  )
}

BlogForm.propTypes = {
  onFieldChange: PropTypes.func.isRequired,
  onCreateBlog: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
}

export default BlogForm
