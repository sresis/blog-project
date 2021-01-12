import React, {useState, useEffect } from 'react';
import { Router, Switch, Route, useHistory, Link, BrowserRouter } from 'react-router-dom';
import './App.css';

import CreateAccount from './Components/CreateAccount'
import Login from './Components/Login'
import Logout from './Components/Logout'
import CreatePost from './Components/CreatePost'
import ViewPosts from './Components/ViewPosts'
import ViewUserPosts from './Components/ViewUserPosts'
import ViewFavorites from './Components/ViewFavorites'
import UpdatePost from './Components/UpdatePost'
import SearchByTitle from './Components/SearchByTitle'

function Homepage() {
  console.log('home');
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
function Test() {
  alert('hi');
  console.log('12');
  return (
    <div>
      test 123
    </div>
  )
}


function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/test" component={Test}/>
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
  );
}

export default App;
