import axios from 'axios'
import {useState} from 'react'
import { useHistory } from 'react-router-dom';

function SearchByTitle() {
    const history = useHistory();
    const initialInputs = {
      title: '',
    }
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
      event.preventDefault()
      axios.get('http://localhost:8080/search_by_title')
      .then((res: any) => {
          history.push('/')
      })
      .catch((err:any) => {
          console.log(err.message, err.name)
      })
      setSearchInput(initialInputs)
    }

    
    return (
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
    )

}
export default SearchByTitle