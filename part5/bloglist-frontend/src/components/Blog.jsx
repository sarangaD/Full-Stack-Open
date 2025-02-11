import { useState, useRef } from 'react'
import TogglableBlogDetails from './TogglableBlogDetails'
import BlogDetails from './BlogDetails'

const Blog = ({ blog }) => {
  const blogDetailsRef = useRef()

  const footerStyle = {
    border: '1px solid grey',
    padding: '6px',
    fontSize: 16,
    width: '50%',
    display: 'flex'
  }

  return (
    <div style={footerStyle}>
    {blog.title} {blog.author}
    <TogglableBlogDetails buttonLabel="view" hideLabel="hide" ref={blogDetailsRef}>
      <br></br>
      <BlogDetails blogDetails={blog}></BlogDetails>
    </TogglableBlogDetails>
    </div>
    
    
  )
}


export default Blog