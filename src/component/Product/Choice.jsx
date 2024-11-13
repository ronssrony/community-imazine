import React, { useRef } from 'react'
import { useEffect, useState } from 'react'
import Reviews from '../Homepage/Reviews';
import { RiArrowDropLeftLine, RiArrowDropRightLine, RiCloseFill, RiMore2Fill } from '@remixicon/react';
import baseUrl from '../../baseUrl';
import { mutate } from 'swr';
function Choice({post , profile}) {

    const [dope , setDope] = useState('Dope'); 
    const [reviewbox, setReviewbox] = useState('hidden')
    const [comments, setComments] = useState(null)
    const menubar = useRef()
    const menu = useRef()
    const indicator = useRef()
    const leftindicator = useRef()
    const [index ,setIndex] = useState(0)
    const [pulse , setPulse] = useState('animate-pulse')
    const [choicehide , setChoicehide] = useState('')
    const [totalslide , setTotalslide] = useState(0)

    let mediafilesRef = useRef()

    useEffect(() => {
      if(post&& post.images && post.videos){
        if(post.images.length>0 || post.videos.length>0){
          indicator.current.style.display = 'block'
          setTotalslide(post.images.length+post.videos.length)
        }
      }
      else if(post && post.videos){
        if(post.videos.length>1){
          indicator.current.style.display ='block' ; 
          setTotalslide(post.videos.length)
        }
      }
      else if (post && post.images ) {
        if(post.images.length>1)
        {
          indicator.current.style.display = 'block'
          setTotalslide(post.images.length)
        
        }
    
      }
    }, [post]);
    
    
 
    
    function handlereview(){
        if(reviewbox==='hidden')
        {
          setReviewbox('block')
          fetch(`${baseUrl}/api/reviews/${post._id}`,{
            credentials:'include'
          }).then((res)=>{
             if(res.ok) return res.json() ;
             else {
              throw Error('No comments are found')
             }
          }).then((comments)=>{
           
             setComments(comments) ;
          })

        }

        else if(reviewbox==='block') {
          setReviewbox("hidden")
        }
    }

    function handlemenu(){
         menubar.current.style.display = 'block'
         menu.current.style.display = 'none'
    }
   function handleDelete(){
        menu.current.style.display = 'block'
       
        fetch(`${baseUrl}/api/post/${post._id}?referid=${post.referid}`, {
          method:"DELETE"
        }).then((res)=> res.json())
        .then((data)=>{
          console.log("deleted")
          mutate("Homepage", undefined, { revalidate: true })
          setChoicehide('hidden')
        })

   }
   function hidemenubar(){
    menubar.current.style.display = 'none'; 
     menu.current.style.display = 'block'
   }

   
  function handleindicator() {
   const mediafiles =mediafilesRef.current
    
    const slideitems = document.querySelectorAll('.images-videos')
    leftindicator.current.style.display = 'block'
    setPulse('')
    if(totalslide-2===index)
    {
      indicator.current.style.display = 'none'; 
    }
    if (totalslide - 1 > index) {
    
      setIndex(index + 1); 
      const overflow = slideitems[index + 1];
      mediafiles.scrollLeft += overflow.offsetWidth;
    
    
    }
  }

  function handleleftIndicator() {
    indicator.current.style.display = 'block'; 
    const mediafiles =mediafilesRef.current
    const slideitems = document.querySelectorAll('.images-videos')
    if(index==1) leftindicator.current.style.display ='none'
    if (index > 0) {
   
      setIndex(index - 1); 
      const overflow = slideitems[index - 1];
      mediafiles.scrollLeft -= overflow.offsetWidth;
     
    }
  }

 
   
  return (
    <div className={`${choicehide} h-auto mb-10`}>
    <div  className="productimg mt-2 h-96 relative ">
     {profile==="true"? <button ref={menu} onClick={handlemenu} className='absolute right-0 z-50'><RiMore2Fill color='white' /> </button>:''}
      <div ref={menubar} className='absolute right-0 hidden backdrop-blur-xl h-full  text-white z-50 p-3 '><button onClick={hidemenubar} className='block absolute top-0 right-0  mb-1'> <RiCloseFill color='white'/> </button>  <button className='block mb-1 mt-3'>Edit</button>  <button onClick={handleDelete}>Delete</button> </div>
     {post.photo&& <img className='h-full min-w-80 object-cover border border-black' src={`${baseUrl}/images/uploads/${post.photo.image}`} alt="" />} 
  
<button onClick={handleindicator} ref={indicator} className={`z-20 absolute right-0 top-[45%] ${pulse} h-20    hidden`}><RiArrowDropRightLine/> </button>
<button onClick={handleleftIndicator} ref={leftindicator}   className={`z-20 absolute left-0 top-[45%] h-20 hidden`}><RiArrowDropLeftLine/> </button>
<div ref={mediafilesRef} className='mediafiles mt-2 h-96 relative flex overflow-x-scroll scrollbarX w-80 '>
{post.videos && post.videos.map((video , ind)=>
  <video preload='auto' autoPlay  muted key={ind} className={`images-videos object-cover block  min-w-80 h-full border border-black `} controls  src={`${baseUrl}/images/uploads/${video}`} ></video>
)}
{post.images && post.images.map((image , ind)=>
 <img key={ind} className={`images-videos sh-full min-w-80 object-cover border border-black`} src={`${baseUrl}/images/uploads/${image}`} alt="" />
)} 
</div>
      
    </div>
   <div className="reaction"> 
       <p className='mb-1 font-[serif]'>{post.reactions.length} Dope</p>
       <div className='reactionbtn relative z-100 flex justify-between px-2 bg-opacity-50  text-lg bg-black text-white w-80 min-w-80'>
           <button className='border-r w-[30%] border-white '>{dope}</button>
           <button onClick={handlereview} className='reviews border-r w-[40%] border-white  '>Reviews</button>
           <button className='w-[30%] '>Share</button>
       </div>
   </div>
   <div className={`${reviewbox} w-80 ` }>
    <div className='scrollbar reviewslider overflow-x-hidden w-full max-h-60 overflow-y-scroll'>

          <div className='reviews relative w-full'>
           {comments&& <div className=' relative w-80'> 
             {comments.map((comment)=>
             <div key={comment._id} className=''>
              <Reviews comment={comment}/>
             </div>
           
             )}
             </div>}



          </div>
     </div>
  
    
   </div>
</div>
  )
}

export default Choice