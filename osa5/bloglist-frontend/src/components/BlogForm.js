import React from 'react'

const BlogForm = props => {
  return (
    <div>
      <h3>Create a new blog</h3>
      <form onSubmit={props.onCreateNewBlog}>
        <div>
          Title:
          <input type="text" name="title" value={props.title} onChange={props.onFieldChange} />
        </div>
        <div>
          Author:
          <input type="text" name="author" value={props.author} onChange={props.onFieldChange} />
        </div>
        <div>
          Url:
          <input type="text" name="url" value={props.url} onChange={props.onFieldChange} />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default BlogForm
