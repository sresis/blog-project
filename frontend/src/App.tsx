import React, {useState, useEffect } from 'react';
import { Router, Switch, Route, useHistory, Link, BrowserRouter } from 'react-router-dom';

import CreateAccount from './Components/CreateAccount'
import Login from './Components/Login'
import CreatePost from './Components/CreatePost'

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
  return (
    <div>
      hello
      <button onClick={createNewUser}>make an account</button>
      <button onClick={login}>login</button>
      <button onClick={createPost}>createPost</button>
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
        <Route path="/create-post/" component={CreatePost}/>
        <Route path="/" component={Homepage}/>
       
      </Switch>

    </BrowserRouter>
  );
}

export default App;
