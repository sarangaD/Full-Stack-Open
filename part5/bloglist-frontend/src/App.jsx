import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      const errorObject = { message: 'Wrong credentials', error: true };
      setErrorMessage(errorObject);
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  // const handleTitleChange = (event) => {
  //   setTitle(event.target.value)
  // }

  // const handleAuthorChange = (event) => {
  //   setAuthor(event.target.value)
  // }

  // const handleUrlChange = (event) => {
  //   setUrl(event.target.value)
  // }

  const addBlog = (blogObject) => {
    const newBlog = {
      title: blogObject.title,
      author: blogObject.author,
      url: blogObject.url
    }

    blogService
      .create(newBlog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        const errorObject = { message: `a new blog '${returnedBlog.title}' by '${returnedBlog.author}'`, error: false };
        setErrorMessage(errorObject);
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })

    blogFormRef.current.toggleVisibility()
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel='login' hideLabel="cancel">
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>)
  }

  const blogsList = () => (
    <div>
      <br></br>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const logout = (event) => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

  return (

    <div>
      <Notification error={errorMessage} />
      {
        !user && loginForm()
      }

      {user && <div>
        <h2>blogs</h2>
        <p>{user.name} logged-in <button onClick={logout}>
          logout
        </button></p>
        <Togglable buttonLabel="create new blog" hideLabel="cancel" ref={blogFormRef}>
          <BlogForm
            createBlog={addBlog}
          />
        </Togglable>
        {blogsList()}
      </div>}

    </div>

  )
}

export default App