import axios from 'axios'
import {useState} from 'react'
function UpdatePost (id:any) {
    const test:any = id.match.params['id']
    console.log(test);
    console.log('id^^^');

    const initialInputs = {
        postContent: ''
      }
    const [postInput, setPostInput] = useState<{postContent: string;}>(initialInputs)
    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPostInput({
          ...postInput,
          [event.currentTarget.name]: event.currentTarget.value
    
        })
      }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(postInput);
  
        axios.post(`http://localhost:8080/update_post/` + test, postInput)
        .then((res: any) => {
            console.log('ccc');
            console.log(id)

        })
        .catch((err:any) => {
            console.log(err.message, err.name)
        })
        // reset
    }
    return (
        <form onSubmit={handleSubmit}>
            <label>Content 
                <input
                type='text'
                name='postContent'
                value={postInput.postContent}
                onChange={handleInput}
                />
            </label>
            <button>Submit</button>
        </form>
    )
}
export default UpdatePost