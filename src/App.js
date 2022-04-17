import axios from "axios"
import { useEffect ,useState} from "react"
import ImageBrick from "./components/Image"
import AddImage from "./components/AddImageScreen"
import DeleteImage from "./components/DeleteMenu"
import logo from "./images/my_unsplash_logo.svg"
const App=()=>{
    const [obj,setObj]=useState(null)
    const [listOfImages,setListOfImages]=useState([])
    const [menu,setMenu]= useState(null)
    const [filterImg,setFilterImg] =useState('')
    const [displayImages,setDisplayImages]=useState([])
    useEffect(()=>{
        async function getItem(){
           const result = await axios.get('http://localhost:3001/photos')
            console.log(result.data[0]['_id'])
            setListOfImages(result.data)
            setDisplayImages(result.data)
        }
        getItem()
    },[menu])
    useEffect(()=>{
        setDisplayImages(listOfImages.filter(x=>x.label.includes(filterImg)))
    },[filterImg])

    return(
        <div className="my-[32px] mx-[100px]">
            <div className="flex flex-row justify-between m-4 mb-16">
                <div className="flex flex-row gap-2 justify-center items-center">
                    <img src={logo}/>
                    <div className="flex flex-row justify-center items-center gap-2 mx-2 border-2 border-[#BDBDBD] p-2 rounded-xl ">
                        <p className="text-[#BDBDBD]">🔎︎</p>
                        <input placeholder="search something" className="focus:outline-none" onChange={(e)=>setFilterImg(e.target.value)}/>
                    </div>
                </div>
                <button className="py-[15px] px-[26px] bg-greenBaby rounded-xl text-white" onClick={()=>setMenu('AddImagePopUp')}>Add a photo</button>
            </div>
            <div className="text-center">
                <div className="columns-3 gap-2 relative top-1/2">
                    {listOfImages===null?<p>Please wait</p>:displayImages.map(x=><ImageBrick imgobj={x} setMenu={setMenu} setObj={setObj}/>)}
                </div>
            </div>
            <div>
                {menu==null?null:(menu==='delete'?<DeleteImage obj={obj} setMenu={setMenu}/>:<AddImage setMenu={setMenu}/>)}
            </div>
            <div className="fixed -translate-x-1/2 bottom-0 left-1/2 w-full py-2 bg-[rgba(250,250,250,1)]">
                <p className="text-center">Created by Paneer007</p>
            </div>
        </div>
    )
}
export default App