import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogService from './services/blogs'
import Login from "./components/Login";
import CreateBlogs from "./components/CreateBlogs";
import Toggleable from "./components/Toggleable";
import {useDispatch, useSelector} from "react-redux";
import {setBlog, upvoteBlog} from "./reducers/blogReducer";
import {resetUser} from "./reducers/userReducer";
import Users from "./components/Users";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import UserBlogList from "./components/UserBlogList";
import BlogList from "./components/BlogList";
import NavBar from "./components/NavBar";

const App = () => {
  const dispatch = useDispatch()

  const token = useSelector( (state) => {return state.user.token})
  const username = useSelector( (state) => {return state.user.username})

  useEffect(() => {
    BlogService.getAll().then(blogs =>
      dispatch(setBlog(blogs))
    )
    BlogService.setToken(token)
  }, [token, dispatch])

  const onClickLogout = () => {
      dispatch(resetUser())
  }

    const upVoteClick = (blogLink) => {
        BlogService.upLike(blogLink)
        dispatch(upvoteBlog(blogLink))
    }

  return (
      <Router>
    <div>
      {token ? null : <Login></Login> }

        {token ? <NavBar logout={onClickLogout} username={username}></NavBar> : null}

        {token
          ? <Toggleable buttonLabel='create new'>
              <CreateBlogs token={username}></CreateBlogs>
            </Toggleable>
          : null}

          <Routes>
              <Route path="/" element={<BlogList token={token}/>} />
              <Route path="/users" element={<Users/>} />
              <Route path="/users/:id" element={<UserBlogList/>} />
              <Route path="/blogs/:id" element={<Blog upVote={upVoteClick}/>} />
          </Routes>

    </div>
      </Router>
  )
}

export default App
