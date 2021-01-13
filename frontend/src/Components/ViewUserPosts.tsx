import React, {useState } from 'react';
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import DeletePost  from './DeletePost'
import UpdatePost  from './UpdatePost'

function ViewUserPosts () {
    const [visiblePosts, setVisiblePosts] = useState(Array);
    const history = useHistory();

    React.useEffect(() => {
        axios.get('http://localhost:8080/show_posts')
        .then((res:any) => {
            setVisiblePosts(res.data);
        })
    }, [visiblePosts])
    
    return (
        <div>
            <div className="posts">
                {visiblePosts &&
                visiblePosts.map((visiblePost:any, index) => {
                return (
                <div className="post" key={index}>
                    <h2>{visiblePost.postTitle}</h2>
                    <div className="details">
                    <p>{visiblePost.postContent}</p>
                    <button onClick={() => DeletePost(`${visiblePost.id}`)}>Delete post</button>
                    <button onClick={()=>{history.push(`/update-post/${visiblePost.id}`)}}>Update post</button>
                    </div>
                </div>
                );
            })}
            </div>
            
        </div>
    )

}
export default ViewUserPosts
