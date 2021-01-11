import axios from 'axios'

function UpdatePost (id:any) {
    axios.post(`http://localhost:8080/update_post/` + id)
    .then((res: any) => {

    })
    .catch((err:any) => {
        console.log(err.message, err.name)
    })

    return (
        <div>
            test
        </div>
    )
}
export default UpdatePost
