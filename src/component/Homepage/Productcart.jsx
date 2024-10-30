import { useEffect, useState , useRef } from 'react'
import Reviews from './Reviews';
import { RiArrowDropLeftLine, RiArrowDropRightLine } from '@remixicon/react';
import ReactionFn from '../../Utility/ReactionFn';
import { postlength ,rightIndicator ,leftIndicator } from '../../Utility/behaviorFn';
import { reviewSubmit } from '../../Utility/ReviewFn';
import baseUrl from '../../baseUrl';
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

    useEffect(() => {
      postlength(post,indicator,setTotalslide )
    }, [post]);

   
    function handlereaction(){
      ReactionFn(react , setReact , dope, setDope , history , post); 
    }

    
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

    function reviewsubmit(e){
        
         e.preventDefault() ;
         let form =e.target ; 
         let formdata = new FormData(form) ; 
         fetch(`${baseUrl}/api/review/${post._id}`,{
    
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
       rightIndicator(leftindicator, setPulse ,totalslide ,indicator ,index ,setIndex,slideitems, mediafiles)
     }
   
     function handleleftIndicator() {
       indicator.current.style.display = 'block'; 
       const mediafiles =mediafilesdoc.current
       const slideitems = document.querySelectorAll('.images-videos')
       leftIndicator(index ,leftindicator ,setIndex , mediafiles , slideitems)
     }
    
  return (
    <div className='h-auto mb-10 flex-col items-center  '>
         <div className="productimg mt-2 h-96 relative">
         {post.photo&& <img className='h-full min-w-96  object-cover border border-black' src={`${baseUrl}/images/uploads/${post.photo.image}`} alt="" />} 
  
<button onClick={handleindicator} ref={indicator} className={`z-20 absolute right-0 top-[45%] ${pulse} h-20 hidden `}><RiArrowDropRightLine/> </button>
<button onClick={handleleftIndicator} ref={leftindicator}   className={`z-20 absolute left-0 top-[45%] h-20  hidden`}><RiArrowDropLeftLine/> </button>
<div ref={mediafilesdoc} className='mediafiles mt-2 h-96 relative flex overflow-x-scroll scrollbarX w-96 '>
{post.videos && post.videos.map((video , ind)=>
  <video preload='auto' autoPlay  muted key={ind} className={`images-videos object-cover block  min-w-96 h-full border border-black `} controls  src={`${baseUrl}/images/uploads/${video}`} ></video>
)}
{post.images && post.images.map((image , ind)=>
 <img key={ind} className={`images-videos sh-full min-w-96 object-cover border border-black`} src={`${baseUrl}/images/uploads/${image}`} alt="" />
)} </div>
         </div>
        <div className="reaction"> 
            <p className='mb-1'>{react} Dope</p>
            <div className='reactionbtn relative z-100 flex justify-between px-2   text-lg bg-black text-white w-96 min-w-96'>
                <button onClick={handlereaction} className='border-r w-[30%] border-white '>{dope}</button>
                <button onClick={handlereview} className='reviews border-r w-[40%] border-white  '>Reviews</button>
                <button className='w-[30%] '>Share</button>
            </div>
        </div>
        <div className={`${reviewbox} w-96 ` }>
         <div className='scrollbar reviewslider  overflow-x-hidden w-full max-h-60 overflow-y-scroll'>

               <div className='reviews relative w-full'>
                {comments&& <div className=' relative w-96'> 
                  {comments.map((comment)=>
                  <div key={comment._id} className=''>
                   <Reviews comment={comment}/>
                  </div>
                
                  )}
                  </div>}
               </div>
          </div>
          <form onSubmit={(e)=>{reviewsubmit(e)}} className='mt-2 relative z-100'>
            <textarea name="review" required placeholder='Write Your Review' className='textarea w-full border rounded p-2  border-black outline-none resize-none'></textarea>
            <button type='submit' className='border border-black px-2 '>Review</button>
          </form>
         
        </div>
    </div>
  )
}

export default Productcart