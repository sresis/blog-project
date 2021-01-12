import axios from 'axios'
import {useState} from 'react'

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
                <div className="post" key={index}>
                    <h2>{visiblePost.postTitle}</h2>
                    <div className="details">
                    <p>{visiblePost.postContent}</p>
                    </div>
                </div>
                );
            })}
            </div>
        </div> 
    )
}
export default SearchByTitle