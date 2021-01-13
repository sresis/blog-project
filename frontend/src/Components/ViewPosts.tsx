import React, {useState } from 'react';
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import CreateFavorite  from './CreateFavorite'
function ViewPosts () {
    const [visiblePosts, setVisiblePosts] = useState(Array);
   
    const response = axios.get('http://localhost:8080/show_posts')
    .then((res: any) => {
        setVisiblePosts(res.data);   
    })
    
    return (
        <div>
            hiiii
            <div className="posts">
                {visiblePosts &&
                visiblePosts.map((visiblePost:any, index) => {
                    console.log(visiblePost);
                return (
                <div className="post" key={index}>
                    <h2>{visiblePost.postTitle}</h2>
                    <div className="details">
                    <p>{visiblePost.postContent}</p>
                    <button onClick={() => CreateFavorite(`${visiblePost.id}`)}>Create Fav</button>
                    </div>
                </div>
                );
            })}
            </div>
            
        </div>
    )

}
export default ViewPosts