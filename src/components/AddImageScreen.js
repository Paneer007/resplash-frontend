import axios from "axios"
import { useState } from "react"
import greenCheck from '../images/greenCheck.png'
import Compress from "compress.js"
const AddImage =({setMenu})=>{
    const compress = new Compress()
    const submitDetails=async ()=>{
        setProcess('loading')
        const tempFile= [...imageUp]
        console.log(tempFile)
        const result = await compress.compress(tempFile,{size:8,quality:1, resize:true})
        console.log(result)
        const img= result[0]
        const base64str = img.data
        const imgExt =  img.ext
        const resizedImage = Compress.convertBase64ToFile(base64str,imgExt)
        console.log(resizedImage)
        const formData = new FormData()
        await formData.append('file',resizedImage)
        await formData.append('label',label)
        await formData.append('password',password) 
        const responseObj = await axios({
            method: 'post',
            url: 'http://localhost:3001/photos/upload',
            data: formData,
            headers: {
                'Content-Type': `multipart/form-data`,
            }
        });
        if(responseObj.status===200){
            setProcess('success')
            cancelDetails()
        }else if(responseObj.status===500){
            setProcess('error')
        }
        console.log(responseObj)
        console.log('done')
    }
    const cancelDetails =()=>{
        setImageUp(null)
        setLabel(null)
        setPassword(null)
        setMenu(null)
    }
    const [imageUp,setImageUp]=useState(null)
    const [label,setLabel]=useState(null)
    const[password,setPassword]=useState(null)
    const [process,setProcess]=useState(null);

    return(
        <div className="fixed z-16 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-xl shadow-xl animate-fadeKitten">
            {process==null? <div>
                <p>Upload image</p>
                <input type='file' name="image" onChange={(e)=>setImageUp(e.target.files)}/>
                <p>Label</p>
                <input className="outline-1px" onChange={(e)=>setLabel(e.target.value)}/>
                <p>Password</p>
                <input onChange={(e)=>setPassword(e.target.value)}/>
                <div className="flex flex-row justify-between">
                    <button onClick={cancelDetails}>Cancel</button>
                    <button onClick={submitDetails}>Submit</button>
                </div>
            </div>: process==='loading'?
                <div className="w-[300px] h-[200px] text-center flex flex-col justify-center items-center">
                    <div className="flex flex-col">
                        <p className="py-5 text-2xl">Loading</p>
                        <p className="py-2">This might take a minute</p>    
                    </div>
                    <div className="h-3 relative max-w-xl rounded-full overflow-hidden w-[300px]">
                        <div className="w-full h-full bg-gray-200 absolute"></div>
                        <div className="h-full bg-green-500 absolute w-1/2 animate-slider"></div>
                    </div>
                </div>
            :process === 'success' ?
            <div>
                <p onClick={cancelDetails}>Cross</p>
                <img src={greenCheck} className='w-[150px]'/>
                <p>Uploaded successfully</p>
            </div>
            :<p>Error</p> }
            
        </div>
    )
    
}
export default AddImage