import React from 'react'
import { Form, Button, Input } from 'semantic-ui-react'

const BlogForm = props => {
  const formStyle = {
    marginTop: '10px',
  }
  return (
    <div style={formStyle}>
      <h3>Create a new blog</h3>
      <Form onSubmit={props.onCreateBlog}>
        <Form.Field>
          <label>Title</label>
          <input type="text" name="title" value={props.title} onChange={props.onFieldChange} />
        </Form.Field>
        <Form.Field>
          <label>Author</label>
          <input type="text" name="author" value={props.author} onChange={props.onFieldChange} />
        </Form.Field>
        <Form.Field>
          <label>Url</label>
          <input type="text" name="url" value={props.url} onChange={props.onFieldChange} />
        </Form.Field>
        <Button primary type="submit">
          Create
        </Button>
      </Form>
    </div>
  )
}

export default BlogForm
