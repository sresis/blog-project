import axios from 'axios'

function DeleteFavorite (id:any) {
    axios.post(`http://localhost:8080/delete_favorite/` + id)
    .then((res: any) => {
        console.log('deleted');
        window.location.reload(true); // refresh page

    })
    .catch((err:any) => {
        console.log(err.message, err.name)
    })

}
export default DeleteFavorite