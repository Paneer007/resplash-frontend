import axios from "axios"
import { useState } from "react"
import greenCheck from '../images/greenCheck.png'
import Compress from "compress.js"
const AddImage =({setMenu})=>{
    const compress = new Compress()
    const submitDetails=async ()=>{
        setProcess('loading')
        const tempFile= [...imageUp]
        const result = await compress.compress(tempFile,{size:8,quality:1, resize:true})
        const img= result[0]
        const base64str = img.data
        const imgExt =  img.ext
        const resizedImage = Compress.convertBase64ToFile(base64str,imgExt)
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
            {process==null? 
            <form onSubmit={submitDetails}>      
                <div className="w-[450px]">
                    <p className="text-[24px] font-medium">Add a new photo</p>
                      
                    <div className="w-full">
                        <p className="text-14px font-medium">Label</p>
                        <input className="outline outline-1 rounded-lg w-full p-1 m-1 text-[14px]" onChange={(e)=>setLabel(e.target.value)} required/>
                    </div>
                    <div>
                        <p className="text-14px font-medium">Password</p>
                        <input className="outline outline-1 w-full rounded-lg p-1" onChange={(e)=>setPassword(e.target.value)} required/>
                    </div>
                    <div className="flex flex-row justify-between">
                        <div>
                            <input type='file' className="hidden" name="image" id="hiddenInput" onChange={(e)=>setImageUp(e.target.files)} required/>
                            <button className="bg-greenBaby rounded p-2 mt-2 mx-2 text-white" onClick={()=>document.getElementById('hiddenInput').click()}>Choose an image</button>
                        </div> 
                        <div className="flex flex-row justify-end ">
                            <button  onClick={cancelDetails} className="text-center rounded p-2 mt-2 mx-2" >Cancel</button>
                            <button submit  className="bg-greenBaby rounded p-2 mt-2 mx-2 text-white shadow-xl">Submit</button>
                        </div>
                    </div>
                    
                </div>
            </form>: process==='loading'?
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