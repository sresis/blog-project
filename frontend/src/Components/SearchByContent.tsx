import axios from 'axios'
import {useState} from 'react'
import { Card } from 'react-bootstrap';
import CreateFavorite  from './CreateFavorite';

function SearchByContent() {
    const initialInputs = {
      content: '',
    }
    const [visiblePosts, setVisiblePosts] = useState(Array);

    const [searchInput, setSearchInput] = useState<{
                                            content: string
                                        }>(initialInputs)
    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput({
        ...searchInput,
        [event.currentTarget.name]: event.currentTarget.value
      })
    }
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      axios.post('http://localhost:8080/search_by_content', searchInput)
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
            <h2>Search By Content</h2>
            <form onSubmit={handleSubmit}>
            <label>Content Contains: 
                <input
                    type='text'
                    name='content'
                    id='content'
                    value={searchInput.content}
                    onChange={handleInput} 
                />
            </label>
            <button>Submit</button>
            </form>
            <div className="posts">
                {visiblePosts &&
                visiblePosts.map((visiblePost:any, index) => {
                return (
                <Card className="postCard" key={index}>
                    <Card.Body>
                        <Card.Title><h4>{visiblePost.postTitle}</h4></Card.Title>
                        <Card.Text>
                            <div className="card-text">
                                {visiblePost.postContent}
                            </div>
                            </Card.Text>
                        <button className="favorite-but" onClick={() => CreateFavorite(`${visiblePost.id}`)}>
                            ♥
                        </button>
                        <i>Posted by {visiblePost.User.username}</i>
                    </Card.Body>
                </Card>
                );
            })}
            </div>
        </div> 
    )
}
export default SearchByContent