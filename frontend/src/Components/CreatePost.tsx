import React, {useState, useEffect } from 'react';
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom';


function CreatePost() {
    // need to pull in the user id
    const history = useHistory();
    const initialInputs = {
      postTitle: '',
      postContent: '',
      postDate: Date() // current date/time
    }
    const [postInput, setPostInput] = useState<{
                                            postTitle: string;
                                            postContent: string; 
                                            postDate: string
                                        }>(initialInputs)
    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPostInput({
        ...postInput,
        [event.currentTarget.name]: event.currentTarget.value
  
      })
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      axios.post('http://localhost:8080/create_post', postInput)
      .then((res: any) => {
          history.push('/')
      })
      .catch((err:any) => {
          console.log(err.message, err.name)
      })
      // reset
      setPostInput(initialInputs)
  
    }
    
    return(
      <form onSubmit={handleSubmit}>
        <label>Title
          <input
            type='text'
            name='postTitle'
            value={postInput.postTitle}
            onChange={handleInput} 
          />
        </label>
        <label>Content
          <input
            type='text'
            name='postContent'
            value={postInput.postContent}
            onChange={handleInput} 
          />
        </label>
        <button>Create Post</button>
      </form>
    )
  }
export default CreatePost