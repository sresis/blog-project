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
 
  return (
    <div>
      <img id="homepage-pic" src="https://i.ibb.co/6m5HBRR/Welcome-to.png" alt="homepage-banner1"></img>
    </div>
  )
}

function App() {
  const [loggedIn, setLoggedIn] = useState("false");

  React.useEffect(() => {
    if (localStorage.getItem("token") === "true") {
      setLoggedIn('true');
    }
    else {
      setLoggedIn('false');
    }
    }, [loggedIn]);
  
  console.log(loggedIn);
    const Navigation = {
      'true': (
      <Navbar id ="topbar-post">
        <Col className="justify-content-end" id="after-login-links">
          <Link to="/">Home </Link>
          <Link to="/create-post">Create Post</Link>
          <div className="dropdown">
            <div className="dropbtn">Explore Posts</div>
            <div className="dropdown-content">
              <Link to="/search-by-title">Search by Title</Link>
              <Link to="/view-user-posts">View Your Posts</Link>
            </div>
          </div>
          <div className="dropdown">
            <div className="dropbtn">Your Account</div>
            <div className="dropdown-content">
              <Link to="/view-user-posts">Your Posts</Link>
              <Link to="/view-favorites">Your Favorites</Link>
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
