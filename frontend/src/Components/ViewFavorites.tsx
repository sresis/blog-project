import React, {useState } from 'react';
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import DeleteFavorite  from './DeleteFavorite';
import { Card } from 'react-bootstrap';

function ViewFavorites () {
    const [favorites, setFavorites] = useState(Array);
    React.useEffect(() => {
        axios.get('http://localhost:8080/show_favorites')
        .then((res:any) => {
            setFavorites(res.data);
        })
    }, [setFavorites])
    
    return (
        <div>
            <h2>Favorite Posts</h2>
            <div className="favorites">
                {favorites &&
                favorites.map((favorite:any, index) => {
                return (
                <Card className="postCard" key={favorite.id}>
                    <h2>{favorite.Post.postTitle}</h2>
                    <div className="card-text">
                    {favorite.Post.postContent}
                    </div>
                    <button onClick={() => DeleteFavorite(`${favorite.id}`)}>Delete Fav</button>
                </Card>
                );
            })}
            </div>
        </div>
    )
}
export default ViewFavorites