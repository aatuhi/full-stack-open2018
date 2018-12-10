import React from 'react'
import { Link } from 'react-router-dom'

const NavigationBar = () => {
  return (
    <div>
      <Link to="/">home</Link> &nbsp;
      <Link to="/blogs">blogs</Link> &nbsp;
      <Link to="/users">users</Link>
    </div>
  )
}

export default NavigationBar
