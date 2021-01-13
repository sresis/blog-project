import axios from 'axios'
import {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';

function UpdatePost (id:any) {
    const idInput:number = id.match.params['id']
    const history = useHistory();
    // get post info
    const [content, setContent] = useState('');
    useEffect(() => {
        axios.get(`http://localhost:8080/get_post_info/` + idInput)
        .then((res:any) => {
            setContent(res.data[0].postContent);
        })
    }, [])
    const handleInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        event.preventDefault();
        setContent(
            event.currentTarget.value
        )
      }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); 
        axios.post(`http://localhost:8080/update_post/` + idInput, {'content': content})
        .then((res: any) => {
            history.push('/view-user-posts');
        })
        .catch((err:any) => {
            console.log(err.message, err.name)
        })
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
                value={content}
                onChange={handleInput} 
            />
            </label>
            <button>Submit</button>
        </form>
    )
}
export default UpdatePost