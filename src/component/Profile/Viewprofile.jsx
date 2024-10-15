import { useState } from "react"
import useFetch from "../utils/useFetch"
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import Choicelist from "../Product/choicelist"
import Sidebar from "../partial/Sidebar"
import { Link } from "react-router-dom"
import { RiMessage2Line} from "@remixicon/react"

function Viewprofile() {
    const [follow , setFollow] = useState('')
    const [pending , setPending] = useState(false)
    const {userid} = useParams()
    useEffect(()=>{
        fetch('http://localhost:3000/api/myfollow',{
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
            console.log(err.message)
        })
    },[userid] )
    function handlefollow(){
        if(follow==='Follow'){
            
            setPending(true)
            fetch(`http://localhost:3000/api/follow/${userid}`,{
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
                fetch(`http://localhost:3000/api/unfollow/${userid}`,{
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



    const {data, isPending , error} = useFetch(`http://localhost:3000/api/viewprofile/${userid}`)
   
  return (
    <div className="font-[joan] w-5/6 ">
     {isPending && <div> .... </div> }
     {error && <div> {error} </div> }
     {data &&  
    <div>

    <Sidebar/>

    <div className="profileside  flex flex-col gap-5 items-center max-sm:translate-y-40 lg:translate-y-20 max-sm:translate-x-8  lg:translate-x-60 ">
    
     <div className="h-36 w-36  relative mb-5 ">

    {data.profile.photo &&  <div className="dp h-full w-full flex flex-col  justify-center "><img className="dpimg rounded-[50%]   h-full w-full  object-cover" src={ `http://localhost:3000/images/uploads/${data.profile.photo}`}/> </div> }



     </div>
     <div>
     <div className=" flex  items-center mb-2  gap-2">
     <button disabled={pending} onClick={handlefollow} className="min-w-fit justify-self-end bg-black text-white px-2 rounded ">{follow}  </button>  
     <Link to={`/message/${userid}`}> <button title="Message"><RiMessage2Line size={24}/></button>    </Link> 
     </div>
     <h1 className="text-lg ">{data.profile.name || data.user.fullname} </h1>
    
     
     </div>
 
     <div className="choicelist">
      <h1 className="text-2xl border-b  border-black pb-2 mb-5">{data.profile.name} Choicelist </h1>
   <div className="choices flex flex-wrap">
   <Choicelist posts={data.posts}  />
   </div>
      </div>    

     </div> 
     </div>

     }
    </div>
  )
}

export default Viewprofile