import React, {useState, createContext } from 'react';
import axios from 'axios'
import { useHistory } from 'react-router-dom';

const initialInputs = {
    username: '',
    password: ''
  }

function Login () {
    const history = useHistory()
    const [loginInput, setLoginInput] = useState<{username: string; password: string;}>(initialInputs)

    // handle when user types login info
    const handleLoginInput = (event: React.ChangeEvent<HTMLInputElement>) => {
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
            console.log(res.data);
            localStorage.setItem("token", "true");
            history.push('/') 
        }    
    })
    .catch((err:any) => {
        console.log(err.message, err.name)
    })
    // reset
    setLoginInput(initialInputs)
    }

return (
    <form onSubmit={handleSubmit}>
        <label>Username
          <input
            type='text'
            name='username'
            value={loginInput.username}
            onChange={handleLoginInput} 
          />
        </label>
        <label>Password
          <input
            type='password'
            name='password'
            value={loginInput.password}
            onChange={handleLoginInput} 
          />
        </label>
        <button>Log In</button>
      </form>
)
}

export default Login
