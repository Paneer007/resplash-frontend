const ImageBrick =({imgobj,setMenu,setObj})=>{
    const deleteImagePreStuff=()=>{
        setMenu('delete');
        setObj(imgobj);
    }
    return(
        <div className="group relative z-0 rounded-lg inline-block mb-8 animate-fadeCat">
            <img src={imgobj.link} className="rounded-xl animate-fadeCat"/>
            <p className="opacity-0 group-hover:opacity-100 z-10 text-white absolute bottom-2 left-2 break-all text-left text-[18px] font-bold group-hover:animate-fadePussy">{imgobj.label}</p>
            <button className="opacity-0 group-hover:opacity-100 z-10 text-red-500 border-2 border-red-500 px-[15px] py-[5px] rounded-full absolute top-4 right-4 text-[10px] group-hover:animate-fadePussy " onClick={deleteImagePreStuff}>Delete</button>
        </div>
    )
}
export default ImageBrick