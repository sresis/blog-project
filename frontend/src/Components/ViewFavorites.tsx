import React, {useState } from 'react';
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import DeleteFavorite  from './DeleteFavorite'
function ViewFavorites () {
    const [favorites, setFavorites] = useState(Array);
        const response = axios.get('http://localhost:8080/show_favorites')
        .then((res: any) => {
            setFavorites(res.data);
        })
    
    return (
        <div>
            <div className="favorites">
                {favorites &&
                favorites.map((favorite:any, index) => {
                return (
                <div className="post" key={favorite.id}>
                    <h2>{favorite.Post.postTitle}</h2>
                    <div className="details">
                    <p>{favorite.Post.postContent}</p>
                    <button onClick={() => DeleteFavorite(`${favorite.id}`)}>Delete Fav</button>
                    </div>
                </div>
                );
            })}
            </div>
            
        </div>
    )

}
export default ViewFavorites