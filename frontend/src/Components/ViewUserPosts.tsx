import React, {useState } from 'react';
import axios from 'axios'
import DeletePost  from './DeletePost'
import UpdatePost  from './UpdatePost'

function ViewUserPosts () {
    const [visiblePosts, setVisiblePosts] = useState(Array);
    const fetchData = () => {
        const response = axios.get('http://localhost:8080/show_user_posts')
        .then((res: any) => {
            setVisiblePosts(res.data);   
        })
    }
    return (
        <div>
            <button onClick={fetchData}>view it</button>
            <div className="posts">
                {visiblePosts &&
                visiblePosts.map((visiblePost:any, index) => {
                return (
                <div className="post" key={index}>
                    <h2>{visiblePost.postTitle}</h2>
                    <div className="details">
                    <p>{visiblePost.postContent}</p>
                    <button onClick={() => DeletePost(`${visiblePost.id}`)}>Delete post</button>
                    <button onClick={() => UpdatePost(`${visiblePost.id}`)}>Update post</button>
                    </div>
                </div>
                );
            })}
            </div>
            
        </div>
    )

}
export default ViewUserPosts
