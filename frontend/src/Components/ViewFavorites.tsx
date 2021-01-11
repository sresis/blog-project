import React, {useState } from 'react';
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import CreateFavorite  from './CreateFavorite'
function ViewFavorites () {
    const [favorites, setFavorites] = useState(Array);
    const fetchData = () => {
        const response = axios.get('http://localhost:8080/show_favorites')
        .then((res: any) => {
            setFavorites(res.data);   
        })
    }
    return (
        <div>
            hiiii
            <button onClick={fetchData}>view it</button>
            <div className="posts">
                {favorites &&
                favorites.map((favorite:any, index) => {
                return (
                <div className="post" key={index}>
                    <h2>{favorite.postID}</h2>
                    <div className="details">
                    <p>{favorite.userID}</p>
                    </div>
                </div>
                );
            })}
            </div>
            
        </div>
    )

}
export default ViewFavorites