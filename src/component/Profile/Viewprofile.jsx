import { useState } from "react"
import useFetch from "../utils/useFetch"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import Choicelist from "../Product/Choicelist"
import { useNavigate } from "react-router-dom"
import {  RiArrowDropLeftLine , RiArrowDropRightLine, RiInstagramFill, RiRedditFill,RiFacebookCircleFill} from "@remixicon/react"
import baseUrl from "../../baseUrl"
import Storycard from "./Storycard"
import { UseLoginContext } from "../../context/LoginProvider"

function Viewprofile() {
    const [follow , setFollow] = useState('')
    const [pending , setPending] = useState(false)
    const {userid} = useParams()
    const [stories , setStories] = useState([])
    const [card , setCard] = useState(null)
    const [initialcard,setInitialcard] = useState(0)
    const localuser = JSON.parse(localStorage.getItem('myId'))
    const {handleDialog} = UseLoginContext()
    const history = useNavigate() ;
    useEffect(()=>{
        fetch(`${baseUrl}/api/myfollow`,{
            credentials:'include'
        }).then((res)=>{
            if(res.ok) return res.json() 
                else {
             throw Error('something went wrong') ;
            } 
        }).then((followers)=>{
            if(followers.includes(userid)){
               setFollow('Following')
            }
            else {
                setFollow('Follow')
            }
        }).catch((err)=>{
            setFollow('Follow')
            console.log(err.message)
        })
    },[userid])
    function handlefollow(){
      if(!localuser){
        handleDialog(); 
        return ;
      }
        if(follow==='Follow'){          
            setPending(true)
            fetch(`${baseUrl}/api/follow/${userid}`,{
                credentials:'include'
            }).then((res)=>{
            
                if(res.ok) {setFollow("Following") ;setPending(false); res.json()}  
                    else {

                 setFollow("Try Again")
                throw Error("something went wrong")      
            }
            }).catch((err)=>{
                console.log(err.message)
            })
        }
        else if(follow==='Following') {
                
                setPending(true)
                fetch(`${baseUrl}/api/unfollow/${userid}`,{
                    credentials:'include'
                }).then((res)=>{
                
                    if(res.ok) {
                        setPending(false)
                        setFollow("Follow") ; 
                        res.json()
                    }  
                    else {
                        
                     setFollow("Try Again")
                    throw Error("something went wrong")      
                }
                }).catch((err)=>{
                    
                    console.log(err.message)
                })
            
        }

    }
    
    const handleMessage = ()=>{
      if(!localuser){
        handleDialog(); 
        return ;
      }
      history(`/message/${userid}`); 
    }
    
    const {data, isPending , error} = useFetch(`${baseUrl}/api/viewprofile/${userid}`)
    
    useEffect(()=> {
      if(data) setStories(data.profile.stories)
      }, [data])
    
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
    function handleleftswipe(){
        const slideitems = document.querySelectorAll('.slideitems') ; 
        
        if(card>0)
        {
          if(card>initialcard)
          {
            setCard(card-initialcard)
  
          }
     
          const overflow = slideitems[card-initialcard]
          console.log(overflow)
          overflow.scrollIntoView({behavior:"smooth" , block:"nearest" , inline:'start'}); 
        }
      }
      function handleRightswipe(){
        const slideitems = document.querySelectorAll('.slideitems') ; 
        console.log("slkideitems" , slideitems)
       if(card<=(slideitems.length))
       { 
         const overflow = slideitems[card]
         console.log("overflow" , overflow)
         overflow.scrollIntoView({behavior:"smooth" , block:"nearest" , inline:'start'}); 
         if(card+initialcard<=slideitems.length)
         {
           setCard(card+initialcard)
  
         }
    
        
       }
      }


   
  return (
    <div className="  h-full">
  
     {data &&  
    <div className="profileside    flex flex-col gap-5 items-center scrollbar  overflow-y-scroll">
     <div className="flex gap-6 items-center">

         
     <div className="md:h-96 md:w-72 h-72 w-60 relative mb-5 ">
    {data.profile.photo &&  <div className="dp h-full w-full relative flex flex-col  justify-center "><img className="dpimg rounded h-full w-full  object-cover" src={ `${baseUrl}/images/uploads/${data.profile.photo}`}/> </div> }
     </div>
     <div>
     <h1 className="text-xl font-semibold mb-2 ">{data.profile.name || data.user.fullname}  </h1>
     <div className=" flex flex-wrap  mb-2  gap-2 ">
     <button disabled={pending} onClick={handlefollow} className=" justify-self-end bg-black text-white px-2 py-1 rounded min-w-24">{follow}  </button>  
    <button onClick={handleMessage} title="Message" className="bg-slate-200 border-2 border-slate-400 rounded-xl px-2 py-1">Message</button>
     </div>  
     <div className="socialicons flex gap-2 mt-4">
    <a href="#"> <RiInstagramFill size={36} className="hover:text-[#833ab4] transition-colors" /> </a>
      <a href="#"><RiRedditFill size={36  } className="hover:text-[#FF5700] transition-colors" /></a>
      <a href="#"><RiFacebookCircleFill size={36} className="hover:text-[#1877F2] transition-colors" /></a>
    </div> 
     <p className="  text-black ">{data.profile.follower.length} Followers</p>
     </div>

     </div>

        <h1 className="self-start text-2xl ">{stories.length>0?"Stories":''}</h1>
     <div className="top_part  w-full gap-10 flex-grow-0 relative  flex justify-center  ">
   
   <div  className="container overflow-x-scroll  scrollbarX">
        <div className={`slider ${stories.length>0?'h-56':'h-0'} flex  flex-shrink gap-5`}>
        <div>
 
   </div >
         {stories.map((story)=>
          <div key={story} className="slideitems rounded-md">
            <Storycard story={story}/>      
          </div>
        )}   
        </div>
      </div>

     

      {data&& card &&<div className="absolute w-20 flex justify-between top-48 left-[50%] z-30 max-md:hidden">
         <button title="previous"  onClick={handleleftswipe} ><RiArrowDropLeftLine className="opacity-60"/></button>
         <button  title="Next"  onClick={handleRightswipe}><RiArrowDropRightLine className="opacity-60"/></button>
      </div>}
    </div>


 
     <div className="choicelist w-full   ">
      <h1 className="text-2xl border-b border-black pb-2 mb-5">{data.profile.name} Choicelist </h1>
   <div className="choices flex flex-wrap gap-4 justify-center ">
   <Choicelist posts={data.posts}  />
   </div>
  </div>    


     </div>

     }
    </div>
  )
}

export default Viewprofile