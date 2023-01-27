import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <Form onSubmit={addBlog}>
      <Form.Group>
        <Form.Label>
          Title:
        </Form.Label>
        <input id='title' value={newTitle} onChange={handleTitleChange} />
      </Form.Group>
      <Form.Group>

        <Form.Label>
          Author:
        </Form.Label>
        <input id='author' value={newAuthor} onChange={handleAuthorChange} />
        </Form.Group>

        <Form.Group>

        <Form.Label>
          Url: <input id='url' value={newUrl} onChange={handleUrlChange} />
        </Form.Label>
      </Form.Group>

      <Button variant="primary" type="submit">
        Post
      </Button>
    </Form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm
