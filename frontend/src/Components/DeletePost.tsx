import axios from 'axios'

function DeletePost (id:any) {
    axios.post(`http://localhost:8080/delete_post/` + id)
    .then((res: any) => {
        window.location.reload(true); // refresh page

    })
    .catch((err:any) => {
        console.log(err.message, err.name)
    })

}
export default DeletePost