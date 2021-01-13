import React, {useState } from 'react';
import {useHistory} from 'react-router-dom'
import axios from 'axios'
import DeletePost  from './DeletePost'
import UpdatePost  from './UpdatePost'
import { Card } from 'react-bootstrap';

function ViewUserPosts () {
    const [visiblePosts, setVisiblePosts] = useState(Array);
    const history = useHistory();

    React.useEffect(() => {
        axios.get('http://localhost:8080/show_user_posts')
        .then((res:any) => {
            setVisiblePosts(res.data);
        })
    }, [visiblePosts])
    
    return (
        <div>
            <h2>Your Posts</h2>
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
                            <button onClick={() => DeletePost(`${visiblePost.id}`)}>Delete post</button>
                            <button onClick={()=>{history.push(`/update-post/${visiblePost.id}`)}}>Update post</button>
                        </Card.Body>
                    </Card>
                );
            })}
            </div>
            
        </div>
    )

}
export default ViewUserPosts
