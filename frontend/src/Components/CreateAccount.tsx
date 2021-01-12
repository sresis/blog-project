import React, {useState, useEffect } from 'react';
import axios from 'axios'
import { useHistory } from 'react-router-dom';

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
      axios.post('http://localhost:8080/create_account', accountInput)
      .then((res: any) => {
          history.push('/') 
      })
      .catch((err:any) => {
          console.log(err.message, err.name)
      })
      // reset
      setAccountInput(initialInputs)
  
    }
    
    return(
      <form onSubmit={handleSubmit}>
        <h2>Create Account</h2>
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
export default CreateAccount