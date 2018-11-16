import React from 'react'
const Blog = props => {
  return (
    <div>
      {props.blog.title} {props.blog.author} {props.blog.url}
    </div>
  )
}

export default Blog
