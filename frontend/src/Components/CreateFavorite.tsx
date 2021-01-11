import React, {useState, useEffect } from 'react';
import axios from 'axios'
import { useHistory } from 'react-router-dom';

function CreateFavorite (id:any) {
    console.log('****');
    console.log(id);
    console.log('steph')
    axios.post(`http://localhost:8080/create_favorite/` + id)
    .then((res: any) => {
        console.log(res); 
    })
    .catch((err:any) => {
        console.log(err.message, err.name)
    })

}
export default CreateFavorite
