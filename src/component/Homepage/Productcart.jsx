import { useEffect, useState , useRef } from 'react'

import Reviews from './Reviews';
import { RiArrowDropLeftLine, RiArrowDropRightLine } from '@remixicon/react';

function Productcart({ post , user}) {

    const [react , setReact] = useState(0) 
    const [dope , setDope] = useState('Dope'); 
    const [reviewbox, setReviewbox] = useState('hidden')
    const [comments, setComments] = useState(null)
    const indicator = useRef()
    const leftindicator = useRef()
    const mediafilesdoc = useRef()
    const [pulse , setPulse] = useState('animate-pulse')
    const [totalslide , setTotalslide] = useState(0)
    const [index , setIndex] = useState(0)

    useEffect(()=>{
      setReact(post.reactions.length)

      if(user!==null && post.reactions.includes(user._id)){
        setDope('Undope')   
      }

        
    },[])
    useEffect(()=>{
      if(post)
      {
         if(post.images && post.videos) 
         {
           if(post.images.length>0 && post.videos.length>0)
           {
             indicator.current.style.display = 'block'
             setTotalslide(post.images.length+post.videos.length)
           }
           else if(post.images.length>0 || post.videos.length>0)
           {
              indicator.current.style.display = 'block'

               if(post.images.length) setTotalslide(post.images.length)
                 else setTotalslide(post.videos.length)
              
           }
         }
      }
   },[post])
   
    function handlereaction(){
        if(dope==='Dope') { 
          setReact(react+1) ; setDope('Undope')
          fetch(`http://localhost:3000/api/dope/${post._id}`,{
            credentials:'include'
          }).then((res)=>{
            if(res.ok) return res.json() 
              else {
             throw Error('Not Doped')
              }
          }).then((info)=>{
            if(info.message==='login')
            {
              history('/login')
            }
            console.log(info.message)
          }).catch((err)=>{
            console.log(err.message)
          })
        }

       else {
        setDope('Dope');  setReact(react-1)
        fetch(`http://localhost:3000/api/undope/${post._id}`,{
          credentials:'include'
        }).then((res)=>{
          if(res.ok) return res.json() 
            else {
           throw Error('Not Doped')
            }
        }).then((info)=>{
          if(info.message==='login')
          {
            history('/login')
          }
          console.log(info.message)
        }).catch((err)=>{
          console.log(err.message)
        })
             
       }

    }

    
    function handlereview(){
        if(reviewbox==='hidden')
        {
          setReviewbox('block')
          fetch(`http://localhost:3000/api/reviews/${post._id}`,{
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

    function reviewsubmit(e){
        
         e.preventDefault() ;
         let form =e.target ; 
         let formdata = new FormData(form) ; 
         fetch(`http://localhost:3000/api/review/${post._id}`,{
    
            method:"POST" ,
           credentials:'include' ,
           body:formdata
         }).then((res)=>{
           if(res.ok) return res.json() 
            else {
          throw Error('something went wrong on reviewsubmit')}
         }).then((comments)=>{
          document.querySelector('.textarea').value = ''; 
            setComments(comments)

         }).catch((err)=>{
          console.log(err.message)
         })
         
    }

    function handleindicator() {
     
      const mediafiles =mediafilesdoc.current
       
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
       const mediafiles =mediafilesdoc.current
       const slideitems = document.querySelectorAll('.images-videos')
       if(index==1) leftindicator.current.style.display ='none'
       if (index > 0) {
        
         setIndex(index - 1); 
         const overflow = slideitems[index - 1];
         mediafiles.scrollLeft -= overflow.offsetWidth;
        
       }
     }
    
  return (
    <div className='h-auto mb-10 flex-col items-center  '>
         <div className="productimg mt-2 h-96 relative">
         {post.photo&& <img className='h-full min-w-80 object-cover border border-black' src={`http://localhost:3000/images/uploads/${post.photo.image}`} alt="" />} 
  
<button onClick={handleindicator} ref={indicator} className={`z-20 absolute right-0 top-[45%] ${pulse} h-20  hidden`}><RiArrowDropRightLine/> </button>
<button onClick={handleleftIndicator} ref={leftindicator}   className={`z-20 absolute left-0 top-[45%] h-20 hidden`}><RiArrowDropLeftLine/> </button>
<div ref={mediafilesdoc} className='mediafiles mt-2 h-96 relative flex overflow-x-scroll scrollbarX w-80 '>
{post.videos && post.videos.map((video , ind)=>
  <video preload='auto' autoPlay  muted key={ind} className={`images-videos object-cover block  min-w-80 h-full border border-black `} controls  src={`http://localhost:3000/images/uploads/${video}`} ></video>
)}
{post.images && post.images.map((image , ind)=>
 <img key={ind} className={`images-videos sh-full min-w-80 object-cover border border-black`} src={`http://localhost:3000/images/uploads/${image}`} alt="" />
)} </div>
         </div>
        <div className="reaction"> 
            <p className='mb-1'>{react} Dope</p>
            <div className='reactionbtn flex justify-between px-2   text-lg bg-black text-white w-80 min-w-80'>
                <button onClick={handlereaction} className='border-r w-[30%] border-white '>{dope}</button>
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
          <form onSubmit={(e)=>{reviewsubmit(e)}} className='mt-2'>
            <textarea name="review" required placeholder='Write Your Review' className='textarea w-full border rounded p-2  border-black outline-none resize-none'></textarea>
            <button type='submit' className='border border-black px-2 '>Review</button>
          </form>
         
        </div>
    </div>
  )
}

export default Productcart