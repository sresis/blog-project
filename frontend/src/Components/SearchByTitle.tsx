import axios from 'axios'
import {useState} from 'react'
import { Card } from 'react-bootstrap';
import CreateFavorite  from './CreateFavorite';

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
          console.log(visiblePosts);
      })
      .catch((err:any) => {
          console.log(err.message, err.name)
      })
      setSearchInput(initialInputs)
    }
    return (
        <div>
            <h2>Search By Title</h2>
            <form onSubmit={handleSubmit}>
            <label>Title Contains: 
                <input
                    type='text'
                    name='title'
                    id='title'
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
export default SearchByTitle