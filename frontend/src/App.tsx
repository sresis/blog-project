import React, {useState, useEffect } from 'react';
import { Router, Switch, Route, useHistory, Link, BrowserRouter } from 'react-router-dom';

function Homepage() {
  console.log('home');
  let history = useHistory()
  const createNewUser = (e:any) => {
    history.push("/create-account")
  }
  return (
    <div>
      hello
      <button onClick={createNewUser}>make an account test</button>
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
function CreateAccount() {
  var history = useHistory();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const createAccount = () => {
    const user = {'username': username, 'password': password}
    alert('form');
    // handle blanks
    if(username === '' || password === '') {
      alert('error - please complete form');
      return
    }
    fetch('/create_account', {
      method:'POST',
      body: JSON.stringify(user),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then((data) => {
      alert('account created')
      history.push('/')
    })

  }
  
  return(
    <div>
      <form>
        <title>Create Account</title>
        <label>
          Username:
          <input type="text" placeholder="Username" onChange={(e) =>setUsername(e.target.value)}></input>
        </label>
        <label>
          Password:
          <input type="password" placeholder="Password" onChange={(e) =>setPassword(e.target.value)}></input>
        </label>
        <input type="submit" onClick={createAccount}></input>
      </form>
      
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/test" component={Test}/>
        <Route path="/create-account" component={CreateAccount}/>
        <Route path="/" component={Homepage}/>
       
      </Switch>

    </BrowserRouter>
  );
}

export default App;
