import axios from "axios"
import { useState } from "react"
const DeleteImage = ({obj,setMenu})=>{
    const [deletePass,setDeletePass] = useState(null)
    const deleteImageStuff=async ()=>{
        const deleteCredentials={
            password:deletePass,
            id:obj['_id']
        }
        const result = await axios.delete('http://localhost:3001/photos/delete',{data:deleteCredentials})
        if(result.status===200){
            setDeletePass(null)
            setMenu(null)
        }
    }
    const cancelImageStuff = async()=>{
        setDeletePass(null)
        setMenu(null)
    }
    return(
        <form onSubmit={deleteImageStuff}>
            <div className="fixed z-16 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-xl shadow-xl animate-fadeKitten w-[450px]">
                <p className="text-[24px] font-medium">Are you sure</p>
                <div>
                    <p className="text-14px font-medium">Password</p>
                    <input onChange={(e)=>setDeletePass(e.target.value)} required className="outline outline-1 w-full rounded-lg p-1"/>
                </div>
                <div className="flex flex-row justify-end ">
                    <button onClick={cancelImageStuff} className="text-center rounded p-2 mt-2 mx-2">Cancel</button>
                    <button submit className="bg-greenBaby rounded p-2 mt-2 mx-2 text-white shadow-xl">Delete</button>
                </div>
            </div>
        </form>
        
    )
}
export default DeleteImage