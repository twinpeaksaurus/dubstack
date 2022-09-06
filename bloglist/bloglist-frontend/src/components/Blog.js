import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'


const Blog = (props) => {
  const blog = props.blog
  const [blogObject, setBlogObject] = useState(blog)
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const buttonLabel = visible ? 'Hide' : 'Quick View'

  const increaseLikes = () => {
    const updatedBlog = ({
      ...blog,
      likes: blog.likes + 1
    })
    props.updateBlog(updatedBlog)
    setBlogObject(updatedBlog)
  }

  /* 
  const addComment = () => {
    const updatedBlog =({
      ...blog,
      comments: NEED TO FIGURE OUT WHAT TO PUT HERE
    })
    props.updateBlog(updatedBlog)
    setBlogObject(updatedBlog)
  }

  */
  const removeBlog = () => props.deleteBlog(blog)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        <p>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title}
          </Link> 
          <br /> 
          Author: {blog.author}
           <br/>
          <Link to={`/users/${blog.user.id}`}>
            {blog.user.username}
          </Link>
          <br />
          <button onClick={toggleVisibility}>{buttonLabel}</button></p>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>{blogObject.likes} <button id='like-button' onClick={increaseLikes}>Like</button></p>
        <button id='remove' onClick={removeBlog}>Remove</button>
      </div>
    </div>
  )
}
/* THIS IS A DRAFT OF THE LINKS AND REACT ROUTING

<Link to={`/blogs/${blog.id}`}>
[ONLY TITLE]
</Link>

[USERNAME CAN ALSO LINK TO USER FOR EASE OF ACCESS AND NAVIGATION]

*/
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog
