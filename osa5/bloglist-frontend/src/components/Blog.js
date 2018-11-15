import React from 'react'
const Blog = props => {
  return (
    <div>
      {props.blog.title} {props.blog.author}
    </div>
  )
}

export default Blog
