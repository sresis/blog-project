import axios from 'axios'
import {useState} from 'react'
import { Card } from 'react-bootstrap';

function SearchByTitle() {
    const initialInputs = {
      title: '',
    }
    const [visiblePosts, setVisiblePosts] = useState(Array);

    const [searchInput, setSearchInput] = useState<{
                                            title: string
                                        }>(initialInputs)
    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput({
        ...searchInput,
        [event.currentTarget.name]: event.currentTarget.value
      })
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      axios.post('http://localhost:8080/search_by_title', searchInput)
      .then((res: any) => {
          setVisiblePosts(res.data);
      })
      .catch((err:any) => {
          console.log(err.message, err.name)
      })
      setSearchInput(initialInputs)
    }

    
    return (
        <div>
            <form onSubmit={handleSubmit}>
            <label>Title Contains: 
                <input
                    type='text'
                    name='title'
                    value={searchInput.title}
                    onChange={handleInput} 
                />
            </label>
            <button>Submit</button>
            </form>
            <div className="posts">
                {visiblePosts &&
                visiblePosts.map((visiblePost:any, index) => {
                    console.log(visiblePost);
                return (
                <Card className="postCard" key={index}>
                    <Card.Body>
                        <Card.Title>{visiblePost.postTitle}</Card.Title>
                        <Card.Text>{visiblePost.postContent}</Card.Text>

                    </Card.Body>

                </Card>
                );
            })}
            </div>
        </div> 
    )
}
export default SearchByTitle