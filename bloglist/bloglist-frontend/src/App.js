/* eslint-disable */

import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import User from './components/User'
import Profile from './components/Profile'
import IndividualBlog from './components/IndividualBlog'

import {
  //BrowserRouter as Router,
  Routes,
  Route,
  Link,
  //Navigate,
  //useParams,
  //useNavigate,
  useMatch
} from 'react-router-dom'


const App = () => {
  const [allBlogs, setAllBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [allUsers, setAllUsers] = useState([])

  const blogFormRef = React.createRef()


  //Matching blogs and users for routing purposes



  const blogMatch = useMatch('/blogs/:id')
  const foundBlog = blogMatch
    ? allBlogs.find(blog => blog.id === blogMatch.params.id)
    : null



  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
      getAllBlogs()
      getAllUsers()
    }
  }, [])

  const userMatch = useMatch('/users/:id')
  const foundUser = userMatch
    ? allUsers.find(user => user.id === userMatch.params.id)
    : null
  console.log({ foundUser })

  const getAllBlogs = async () => {
    const blogs = await blogService.getAll()
    setAllBlogs(blogs)
  }


  const getAllUsers = async () => {
    const users = await userService.getAll()
    setAllUsers(users)
  }
  const padding = {
    padding: 5
  }

  /*
const Users = ({allUsers})
  */
  const Home = () => {
    return
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setSuccessMessage(null)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const createBlog = async (BlogToAdd) => {
    try {
      blogFormRef.current.toggleVisibility()
      const createdBlog = await blogService
        .create(BlogToAdd)
      setSuccessMessage(
        `Blog ${BlogToAdd.title} was successfully added`
      )
      setAllBlogs(allBlogs.concat(createdBlog))
      setErrorMessage(null)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage(
        `Cannot add blog ${BlogToAdd.title}`
      )
      setSuccessMessage(null)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }
  }

  const updateBlog = async (BlogToUpdate) => {
    try {
      const updatedBlog = await blogService
        .update(BlogToUpdate)
      setSuccessMessage(
        `"${BlogToUpdate.title}" was successfully updated`
      )
      setAllBlogs(allBlogs.map(blog => blog.id !== BlogToUpdate.id ? blog : updatedBlog))
      setErrorMessage(null)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage(
        `Cannot update "${BlogToUpdate.title}"`
      )
      setSuccessMessage(null)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = async (BlogToDelete) => {
    try {
      if (window.confirm(`Delete ${BlogToDelete.title} ?`)) {
        blogService
          .remove(BlogToDelete.id)
        setSuccessMessage(
          `"${BlogToDelete.title}" was successfully deleted`
        )
        setAllBlogs(allBlogs.filter(blog => blog.id !== BlogToDelete.id))
        setErrorMessage(null)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      }
    } catch (exception) {
      setErrorMessage(
        `Cannot delete blog ${BlogToDelete.title}`
      )
      setSuccessMessage(null)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <h2>Dubstack</h2>
      <div>
        <Link style={padding} to="/blogs">Blogs</Link>
        <Link style={padding} to="/users">Users</Link>
        {user !== null
          ? `${user.name} logged in`
          : <Link style={padding} to="/login">Login</Link>
        }
        {user
          ? <button onClick={handleLogout} type="submit">logout</button>
          : null}
      </div>
      <Notification errorMessage={errorMessage} successMessage={successMessage} />




      {user === null ?
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          setPassword={setPassword}
          password={password}
        /> :
        <div>
          <div>


            <Togglable buttonLabel="Add new blog" ref={blogFormRef}>
              <BlogForm
                createBlog={createBlog}
              />
            </Togglable>
            <br />
            <Routes>
              <Route path="/users/:id" element={<Profile user={foundUser} />} />
              <Route path="/blogs/:id" element={<IndividualBlog 
              blog={foundBlog}
              updateBlog={updateBlog} />} />
              <Route path="/blogs" element={
                <div>
                  <h2>Blog Posts</h2>
                  {allBlogs.sort(byLikes).map(blog =>
                    <Blog
                      key={blog.id}
                      blog={blog}
                      updateBlog={updateBlog}
                      deleteBlog={deleteBlog}
                    />
                  )}
                </div>} />
              <Route path='/users' element={
                <div>
                  <h2>Active Users</h2>

                  {allUsers.map(user =>
                    <User
                      key={user.id}
                      user={user}
                    />
                  )}
                </div>}

              />
            </Routes>
          </div>
        </div>
      }
    </div>
  )
}

export default App
