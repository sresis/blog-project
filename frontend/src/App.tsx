import React, {useState, useEffect } from 'react';
import { Router, Switch, Route, useHistory, Link, BrowserRouter } from 'react-router-dom';
import axios from 'axios'

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
  const history = useHistory();
  const initialInputs = {
    username: '',
    password: ''
  }
  const [accountInput, setAccountInput] = useState<{username: string; password: string;}>(initialInputs)
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccountInput({
      ...accountInput,
      [event.currentTarget.name]: event.currentTarget.value

    })
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    console.log(accountInput)
    axios.post('http://localhost:8080/create_account', accountInput)
    .then( (res: any) => {
        console.log(res.data)
        history.push('/login') 
    })
    .catch((err:any) => {
        console.log(err.message, err.name)
    })
    // reset
    setAccountInput(initialInputs)

  }
  
  return(
    <form onSubmit={handleSubmit}>
      <label>Username
        <input
          type='text'
          name='username'
          value={accountInput.username}
          onChange={handleInput} 
        />
      </label>
      <label>Password
        <input
          type='password'
          name='password'
          value={accountInput.password}
          onChange={handleInput} 
        />
      </label>
      <button>Create Account</button>


    </form>
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
