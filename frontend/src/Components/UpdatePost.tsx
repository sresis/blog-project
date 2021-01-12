import axios from 'axios'
import {useState} from 'react'
import { useHistory } from 'react-router-dom';

function UpdatePost (id:any) {
    const idInput:number = id.match.params['id']
    const history = useHistory();

    const initialInputs = {
        postContent: ''
      }
    const [postInput, setPostInput] = useState<{postContent: string;}>(initialInputs)
    const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPostInput({
          ...postInput,
          [event.currentTarget.name]: event.currentTarget.value
    
        })
      }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(postInput);
  
        axios.post(`http://localhost:8080/update_post/` + idInput, postInput)
        .then((res: any) => {
            history.push('/view-user-posts');

        })
        .catch((err:any) => {
            console.log(err.message, err.name)
        })
        // reset
    }
    return (
        <form onSubmit={handleSubmit}>
            <label>
            <h3>Updated Content</h3>
            <p></p>
            <textarea
                name='postContent'
                id="contentInput"
                className="scrollabletextbox"
                value={postInput.postContent}
                onChange={handleInput} 
            />
            </label>
            <button>Submit</button>
        </form>
    )
}
export default UpdatePost