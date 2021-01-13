import React, {useState, createContext } from 'react';
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import { couldStartTrivia } from 'typescript';
const initialInputs = {
    username: '',
    password: ''
  }

function Login () {
    const history = useHistory();
    const [loginInput, setLoginInput] = useState<{username: string; password: string;}>(initialInputs)

    // handle when user types login info
    const handleLoginInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
        setLoginInput({
          ...loginInput,
          [event.currentTarget.name]: event.currentTarget.value
        })
      }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    axios.post('http://localhost:8080/login', loginInput)
    .then((res: any) => {
        if('error' in res.data){
            alert(res.data.error)
        }
        else {
            localStorage.setItem("token", "true");
            window.location.reload(true); // refresh page
        }    
    })
    .catch((err:any) => {
        console.log(err.message, err.name)
    })
    // reset
    setLoginInput(initialInputs)
    history.push('/');
    }

return (
    <form onSubmit={handleSubmit} id="login-form" data-testid="login-form">
      <h2>Login</h2>
        <label>Username
          <input
            data-testid="username"
            type='text'
            name='username'
            id='username'
            value={loginInput.username}
            onChange={handleLoginInput} 
          />
        </label>
        <p></p>
        <label>Password
          <input
            data-testid="password"
            type='password'
            name='password'
            value={loginInput.password}
            onChange={handleLoginInput} 
          />
        </label>
        <p></p>
        <button>Log In</button>
      </form>
)
}

export default Login
