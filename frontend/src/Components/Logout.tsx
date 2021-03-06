import React, {useState } from 'react';
import axios from 'axios'
import { useHistory, Redirect } from 'react-router-dom';

function Logout () {
    console.log('frontend logout')
    axios.get('http://localhost:8080/logout')
    .then((res: any) => {
        localStorage.setItem("token", "false"); 
        window.location.reload(true); // refresh page
  
    })
    .catch((err:any) => {
        console.log(err.message, err.name)
    })


return (
    <Redirect to='/' />
)
}
export default Logout