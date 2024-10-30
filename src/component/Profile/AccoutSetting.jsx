
import { useState } from "react"
import useFetch from "../utils/useFetch"
import {RiAddLine} from '@remixicon/react'
import baseUrl from "../../baseUrl"

function AccoutSetting() {
    const {data, isPending , error} = useFetch(`${baseUrl}/api/profile`)
    const [image ,setImage] = useState('/images/profile.jpg'); 
    const [ispendingimg , setPending ] = useState(false)
    const [submit , setSubmit] = useState('')
    function previewImage(e){
        document.querySelector('.submitbtn').style.display = 'flex'; 
        
        setSubmit('Submit')
        let filereader = new FileReader() ;
         
        filereader.onload = ((event)=>{
          document.querySelector('.dpimg').setAttribute("src",event.target.result)
           setImage(event.target.result)
        })
        
        filereader.readAsDataURL(e.target.files[0])
        
      }  
    function handleimageform(e){
        e.preventDefault();
        setPending(true)
        setSubmit('......')
        let form =e.target ; 
        let formdata = new FormData(form) ; 
        fetch( `${baseUrl}/api/profile/${data.user._id}`, {
          method:"POST" , 
          body:formdata , 
          credentials:"include"
        }).then((res)=>{
          setPending(false)
          setSubmit('Submit')
          console.log(res)
          if(res.ok) return res.json() 
          else{
            throw Error('Input is invalid') ; 
          }
        }).then((data)=>{
          
        }).catch((err)=>{
          console.log(err.message)
        })
      }
  
  return (
    <div className=" flex  justify-center h-full"> 
 
    {data&&   <div className="h-48 w-36  relative mb-5 ">
    {data.user.picture &&   <div className="dp h-full w-full flex flex-col  justify-center "><img className="dpimg rounded-[50%] border-4 border-opacity-70 border-[#DC143C] h-full w-full  object-cover" src={ `${baseUrl}/images/uploads/${data.user.picture}`}/> <form onSubmit={(e)=>handleimageform(e)} encType="multipart/form-data"  >
    <label className="absolute w-full text-center  flex justify-center bg-white bg-opacity-60 z-10 bottom-0" htmlFor="image"> <RiAddLine/> </label>
     <input type="file" name="image" id="image" className="hidden" onChange={(e)=>{previewImage(e)}}/> 
     <button className="submitbtn hidden absolute left-9  w-1/2 text-center flex justify-center bg-[#e6385a] text-white mt-2 hover:bg-opacity-70 active:bg-opacity-100 z-10 rounded" disabled={ispendingimg} type="submit">{submit}</button> </form> </div> }
    
    {data.profile.photo &&  <div className="dp h-full w-full flex flex-col  justify-center "><img className="dpimg   h-full w-full  object-cover" src={ `${baseUrl}/images/uploads/${data.profile.photo}`}/> <form onSubmit={(e)=>handleimageform(e)} encType="multipart/form-data"  >
    <label className="absolute w-full text-center  flex justify-center bg-white bg-opacity-60 z-10 bottom-0" htmlFor="image"> <RiAddLine/> </label>
     <input type="file" name="image" id="image" className="hidden" onChange={(e)=>{previewImage(e)}}/> 
     <button className="submitbtn hidden absolute left-9  w-1/2 text-center flex justify-center bg-[#e6385a] text-white mt-2 hover:bg-opacity-70 active:bg-opacity-100 z-10 rounded" disabled={ispendingimg} type="submit">{submit}</button> </form> </div> }
    
    
    {!data.profile.photo && !data.user.picture  &&  <div className="dp h-full w-full flex flex-col  justify-center "><img className="dpimg rounded-[50%] border-4 border-opacity-70 border-[#DC143C] h-full w-full  object-cover" src={`${image}`}/> <form onSubmit={(e)=>handleimageform(e)} encType="multipart/form-data"  >
    <label className="absolute w-full text-center  flex justify-center bg-white bg-opacity-60 z-10 bottom-0" htmlFor="image"> <RiAddLine/> </label>
     <input type="file" name="image" id="image" className="hidden" onChange={(e)=>{previewImage(e)}}/> 
     <button className="submitbtn hidden absolute left-9  w-1/2 text-center flex justify-center bg-[#e6385a] text-white mt-2 hover:bg-opacity-70 active:bg-opacity-100 z-10 rounded" disabled={ispendingimg} type="submit">{submit}</button> </form> </div> }
    
    
     </div>}
    </div>
  )
}

export default AccoutSetting