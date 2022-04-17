import axios from "axios"
import { useState } from "react"
const DeleteImage = ({obj,setMenu})=>{
    console.log(obj)
    const [deletePass,setDeletePass] = useState(null)
    const deleteImageStuff=async ()=>{
        console.log(obj)
        const deleteCredentials={
            password:deletePass,
            id:obj['_id']
        }
        console.log(deleteCredentials)
        const result = await axios.delete('http://localhost:3001/photos/delete',{data:deleteCredentials})
        if(result.status===200){
            setDeletePass(null)
            setMenu(null)
        }
        console.log(result)
    }
    return(
        <div className="fixed z-16 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-xl shadow-xl animate-fadeKitten">
            <p>Are you sure</p>
            <div>
                <p>Password</p>
                <input onChange={(e)=>setDeletePass(e.target.value)}/>
            </div>
            <div>
                <p>Cancel</p>
                <p onClick={deleteImageStuff}>Delete</p>
            </div>
        </div>
    )
}
export default DeleteImage