import React, {useState, useEffect, createContext } from 'react';
import { Router, Switch, Route, useHistory, Link, BrowserRouter } from 'react-router-dom';
import './App.css';
import axios from 'axios'

import CreateAccount from './Components/CreateAccount'
import Login from './Components/Login'
import Logout from './Components/Logout'
import CreatePost from './Components/CreatePost'
import ViewPosts from './Components/ViewPosts'
import ViewUserPosts from './Components/ViewUserPosts'
import ViewFavorites from './Components/ViewFavorites'
import UpdatePost from './Components/UpdatePost'
import SearchByTitle from './Components/SearchByTitle'
import {Button, Alert, Col, Row, Collapse, 
	Form, FormControl, Nav, Navbar, Popover } from 'react-bootstrap';


function Homepage() {
  let history = useHistory()
  const createNewUser = (e:any) => {
    history.push("/create-account")
  }
  const login = (e:any) => {
    history.push('/login')
  }
  const createPost = (e:any) => {
    history.push('/create-post')
  }
  const logout = (e:any) => {
    history.push('/logout')
  }
  const viewPosts = (e:any) => {
    history.push('/view-posts')
  }
  const viewUserPosts = (e:any) => {
    history.push('/view-user-posts')
  }
  const viewFavorites = (e:any) => {
    history.push('/view-favorites')
  }
  const searchByTitle = (e:any) => {
    history.push('/search-by-title')
  }
 
  return (
    <div>
      hello
      <button onClick={createNewUser}>make an account</button>
      <button onClick={login}>login</button>
      <button onClick={createPost}>create Post</button>
      <button onClick={logout}>logout</button>
      <div>
        <button onClick={viewPosts}>View posts</button>
        <button onClick={viewUserPosts}>View your posts</button>
        <button onClick={viewFavorites}>View your favs</button>
        <button onClick={searchByTitle}>search by title</button>

      </div>
    </div>
  )
}

function App() {
  const [loggedIn, setLoggedIn] = useState("false");

  React.useEffect(() => {
    if (localStorage.getItem("token") === "true") {
      setLoggedIn('true');

    }
    }, [loggedIn]);
  
  console.log(loggedIn);
  //navigation
  
  
  
  
    // group navbar links into 1) viewable by logged in users only 2) viewable when not logged in
    const Navigation = {
      'true': (
      <Navbar id ="topbar-post">
        <Col className="justify-content-end" id="after-login-links">
          <Link to="/">Home </Link>
          <Link to="/view-user-posts">View Your Posts</Link>
          <div className="dropdown">
            <div className="dropbtn">Search Posts</div>
            <div className="dropdown-content">
              <Link to="/search-by-title">Search by Title</Link>
              <Link to="/view-user-posts">View Your Posts</Link>
            </div>
          </div>
          <div className="dropdown">
            <div className="dropbtn">Your Account</div>
            <div className="dropdown-content">
              <Link to="/view-user-posts">View Your Posts</Link>
              <Link to="/view-favorites">View Your Favorites</Link>
            </div>
          </div>
          <Link to="/logout">Log Out</Link>
        </Col>
       </Navbar>
      
      ),
      'false': (
        <Navbar id ="topbar-pre">
          <Col className="justify-content-end" id="before-login-links">
            <Link to="/">Home </Link>
            <Link to="/login">Log In</Link>
            <Link to="/create-account">Create Account</Link>
          </Col>
        </Navbar>
      )
  }

  
  return (
    <div className="App">
      <BrowserRouter>
        {Navigation[loggedIn]}
        <Switch>
          <Route path="/create-account" component={CreateAccount}/>
          <Route path="/login" component={Login}/>
          <Route path="/create-post" component={CreatePost}/>
          <Route path="/logout/" component={Logout}/>
          <Route path="/view-posts/" component={ViewPosts}/>
          <Route path="/view-user-posts" component={ViewUserPosts}/>
          <Route path="/view-favorites" component={ViewFavorites}/>
          <Route path="/update-post/:id" component={UpdatePost}/>
          <Route path="/search-by-title" component={SearchByTitle}/>
          <Route path="/" component={Homepage}/>
      
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
