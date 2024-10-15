import { useEffect, useState } from "react"
import useFetch from "../utils/useFetch"
import {RiAddLine, RiArrowDropLeftLine, RiArrowDropRightLine, RiCloseLine, RiFileVideoLine, RiImageAddLine, RiSendPlane2Fill, } from '@remixicon/react'

import Choicelist from "../Product/choicelist"
import Sidebar from "../partial/Sidebar"
import Storycard from "./Storycard"


function Profile() {

    const {data, isPending , error} = useFetch('http://localhost:3000/api/profile')
    const [image ,setImage] = useState('/images/profile.jpg'); 
    const [ispendingimg , setPending ] = useState(false)
    const [submit , setSubmit] = useState('')
    const [stories , setStories] = useState([])
    const [card , setCard] = useState([])
    const [initialcard,setInitialcard] = useState(0)
    const [story , setStory] = useState(null) ;
    const [postimage, setPostimage] = useState([]); 
    const [video , setVideo] = useState([]) ; 
    const [posts , setPosts] = useState([]) 
    const [pulse , setPulse] = useState('bg-green-200')
    const [files, setFiles] = useState([])
    const [previewVideos , setpreviewVideos]= useState([])

   
    useEffect(()=>{
      if(data){setStories(data.profile.stories) ; setPosts(data.posts)} 
    },[data])

    useEffect(()=>{
          if(data){
            const container = document.querySelector('.container'); 
           const containersize = container.clientWidth ; 
           console.log(containersize)
           const cards = document.querySelectorAll('.slideitems')
           const scrollposition = container.scrollLeft ;
             
            for (let index = 0; index < cards.length; index++) {
               const cardpostion = cards[index].offsetLeft

                if(containersize<cardpostion+scrollposition)
                {
                   setCard(index); 
                   setInitialcard(index)
              
                   return 
                }
              
            }
          }
       
    },[stories])

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
      fetch( `http://localhost:3000/api/profile/stories/${data.user._id}`, {
        method:"POST" , 
        body:formdata , 
        credentials:"include"
      }).then((res)=>{
        setPending(false)
        setSubmit('')
        document.querySelector('.dpimg').setAttribute("src",`http://localhost:3000/images/uploads/${data.profile.photo}`)
        
        console.log(res)
        if(res.ok) return res.json() 
        else{
          throw Error('Input is invalid') ; 
        }
      }).then((data)=>{
        setStories(s => [...s, data.message])
      }).catch((err)=>{
        console.log(err.message)
      })
    }
    
    function handleleftswipe(){
      const slideitems = document.querySelectorAll('.slideitems') ; 
      if(card>0)
      {
        if(card>initialcard)
        {
          setCard(card-initialcard)

        }
   
        const overflow = slideitems[card-initialcard]
        overflow.scrollIntoView({behavior:"smooth" , block:"nearest" , inline:'start'}); 
      }
    }
    function handleRightswipe(){
      const slideitems = document.querySelectorAll('.slideitems') ; 
      
     if(card<=(slideitems.length))
     { 
       const overflow = slideitems[card]
       overflow.scrollIntoView({behavior:"smooth" , block:"nearest" , inline:'start'}); 
       if(card+initialcard<=slideitems.length)
       {
         setCard(card+initialcard)

       }
  
      
     }
    }


   function HandlePost(e){
     e.preventDefault(); 
     setPulse('animate-pulse bg-green-50')
     if(!story && !postimage && !video  ){ 
      setPulse('bg-green-200') ;
       return 
      }
    if(!story && postimage && postimage.length<1 && video && video.length<1){setPulse('bg-green-200');  return} 
     let formdata = new FormData();  
     formdata.append('story', story) 
     if(postimage.length>0)
     {
       postimage.forEach((file ,ind)=>{
        formdata.append('postimage',file)
       })
     }
     if(video.length>0)
     {
        video.forEach((file,ind)=>{
          formdata.append("video", file)
        })
     }

     
     fetch('http://localhost:3000/api/latest/post',{
      method:"POST",  
      body:formdata, 
      credentials:'include'
     }).then((res)=>{
      if(res.ok) return res.json()  
        else {
      throw Error("Post Not added")}
     }).then((data)=>{
       setPosts(p=>[ data.post , ...p ]) 
      document.querySelector('input[name="story"]').value = ''; 
        setStory(null)
       setPostimage([]) ; 
       setVideo([]); 
       setFiles([]); 
       setpreviewVideos([])
       formdata = new FormData(); 
       setPulse('bg-green-200')
     }).catch((err)=>{
      console.log(err.message)
     })
   }
   
   function showfiles(e){
   
    let filereader = new FileReader() ;
     
    filereader.onload = ((event)=>{
     
      setFiles(f=>[...f, event.target.result])
    })
    
    filereader.readAsDataURL(e.target.files[0])
    
  }  
  function showvideos(e){
    let filereader = new FileReader() ;
     
    filereader.onload = ((event)=>{
     
      setpreviewVideos(p=>[...p, event.target.result])
    })
    
    filereader.readAsDataURL(e.target.files[0])
  }

  function removeitem(e){
    console.log('clickeed')
    let ind = e.target.getAttribute('id')
    postimage.splice(ind,1); 
    let newfile =  files.filter((file, i)=>
      {
        if(i!=ind)return true
      }
      )
        setFiles(newfile)

  }

  function removevideos(e){
    let ind = e.target.getAttribute('id')
    video.splice(ind,1)
    let newfile =  files.filter((file, i)=>
      {
        if(i!=ind)return true
      }
      )
        setpreviewVideos(newfile)
  }

  return (
    <div className="font-[joan] w-5/6  max-sm:w-full  ">
     <Sidebar/>
     {isPending && <div> .... </div> }
     {error && <div> {error} </div> }
    {data &&  
    <div className="">

    <div className="profileside flex flex-col items-center gap-5  max-lg:translate-y-48 lg:translate-y-16   lg:translate-x-60 ">
    <h1 className="self-start text-2xl ">Stories</h1>
    <div className="top_part   w-full gap-10 flex-grow-0  flex justify-center  ">
   

  
   <div  className="container overflow-x-scroll  scrollbarX">
        <div className="slider h-56 flex  flex-shrink gap-5">
        <div>
   <div className="h-48 w-36 slideitems  relative mb-5 ">

{data.user.picture &&   <div className="dp h-full w-full flex flex-col  justify-center "><img className="dpimg  border-4 border-opacity-70 border-[#DC143C] h-full w-full  object-cover" src={ `http://localhost:3000/images/uploads/${data.user.picture}`}/> <form onSubmit={(e)=>handleimageform(e)} encType="multipart/form-data"  >
<label className="absolute w-full text-center  flex justify-center bg-white bg-opacity-60 z-10 bottom-0" htmlFor="image"> <RiAddLine/> </label>
 <input type="file" name="image" id="image" className="hidden" onChange={(e)=>{previewImage(e)}}/> 
 <button className="submitbtn hidden absolute left-9  w-1/2 text-center flex justify-center bg-[#e6385a] text-white mt-2 hover:bg-opacity-70 active:bg-opacity-100 z-10 rounded" disabled={ispendingimg} type="submit">{submit}</button> </form> </div> }

{data.profile.photo &&  <div className="dp h-full w-full flex flex-col  justify-center "><img className="dpimg rounded-md  h-full w-full  object-cover" src={ `http://localhost:3000/images/uploads/${data.profile.photo}`}/> <form onSubmit={(e)=>handleimageform(e)} encType="multipart/form-data"  >
<label className="absolute w-full text-center  flex justify-center bg-white bg-opacity-60 z-10 bottom-0" htmlFor="image"> <RiAddLine/> </label>
 <input type="file" name="image" id="image" className="hidden" onChange={(e)=>{previewImage(e)}}/> 
 <button className="submitbtn hidden absolute left-9  w-1/2 text-center flex justify-center bg-[#e6385a] text-white mt-2 hover:bg-opacity-70 active:bg-opacity-100 z-10 rounded" disabled={ispendingimg} type="submit">{submit}</button> </form> </div> }


{!data.profile.photo && !data.user.picture  &&  <div className="dp h-full w-full flex flex-col  justify-center "><img className="dpimg  border-4 border-opacity-70 border-[#DC143C] h-full w-full  object-cover" src={`${image}`}/> <form onSubmit={(e)=>handleimageform(e)} encType="multipart/form-data"  >
<label className="absolute w-full text-center  flex justify-center bg-white bg-opacity-60 z-10 bottom-0" htmlFor="image"> <RiAddLine/> </label>
 <input type="file" name="image" id="image" className="hidden" onChange={(e)=>{previewImage(e)}}/> 
 <button className="submitbtn hidden absolute left-9  w-1/2 text-center flex justify-center bg-[#e6385a] text-white mt-2 hover:bg-opacity-70 active:bg-opacity-100 z-10 rounded" disabled={ispendingimg} type="submit">{submit}</button> </form> </div> }


 </div>
 
   </div>
         {stories.map((story)=>
          <div key={story} className="slideitems rounded-md">
            <Storycard story={story}/>      
          </div>
        )}
               
        </div>
      </div>


      <div className="absolute w-20 flex justify-between top-64 left-[50%] z-30 max-md:hidden">
         <button title="previous"  onClick={handleleftswipe} ><RiArrowDropLeftLine/></button>
         <button  title="Next"  onClick={handleRightswipe}><RiArrowDropRightLine/></button>
      </div>
    </div>
       


      <div className={`${pulse} post w-full  h-28 rounded-xl flex justify-center items-center`}>
            
           <form onSubmit={(e)=>HandlePost(e)} encType="multipart/form-data" className="inputs relative w-5/6 bg-white rounded-xl h-16">
             <input type="text" onChange={(e)=>setStory(e.target.value)} name="story" className="w-full h-full  outline-none border-2 px-5 pr-28 border-green-200 rounded-lg" placeholder="What's your latest find?" />
             <div className="absolute right-2 top-[2%] flex gap-2 ">
             <label title="Image"  className="py-5 "  htmlFor="postimage"> <RiImageAddLine className="text-[#96DED1] hover:text-cyan-400 transition-colors active:text-[#96DED1] " />  </label>
             <input type="file" accept="image/*" onChange={(e)=>{setPostimage(p=>[...p,e.target.files[0]]); showfiles(e)}} id="postimage" name="postimage" className="hidden "  />
             <label title="Video" className="py-5 px-1 "  htmlFor="video"> <RiFileVideoLine className="text-[#96DED1] hover:text-cyan-400 transition-colors active:text-[#96DED1]  "/> </label>
             <input type="file" accept="video/*" onChange={(e)=>{setVideo(v=>[...v ,e.target.files[0]]);showvideos(e)}} id="video" name="video" className="hidden " />
             <button className="py-5" type="submit"> <RiSendPlane2Fill className="text-[#96DED1] hover:text-cyan-400 transition-colors active:text-[#96DED1] "/> </button>
             </div>

           </form>
        </div>

        <div className="showfiles flex self-start gap-5 overflow-hidden">
          {files&& files.map((file, ind)=>
           <div key={ind} className="images_videos w-20 h-28 relative rounded-lg">
            <button className="absolute right-0 top-0 text-xl" > <RiCloseLine id={ind} onClick={(e) => removeitem(e)} /> </button>
            <img src={`${file}`} alt="" className=" w-full h-full object-cover rounded-lg"/>
              </div>
          )}
          {previewVideos && previewVideos.map((file, ind)=>
                  <div key={ind} className="images_videos w-20 h-28 relative rounded-lg">
                  <button className="absolute right-0 top-0 text-xl z-50"  ><RiCloseLine id={ind} onClick={(e) => removevideos(e)} /> </button>
                  <video autoPlay muted src={`${file}`} className=" w-full h-full object-cover rounded-lg"></video>        
                    </div>
          )}
          
        </div>


     <div className="choicelist ">
      <h1 className="text-2xl border-b  border-black pb-2 mb-5">Your Choicelist </h1>
   <div className="choices flex flex-wrap gap-5 justify-center ">
   <Choicelist posts={posts}  />
   </div>
      </div>    

     </div> 
     </div>

     }
    </div>
  )
}

export default Profile