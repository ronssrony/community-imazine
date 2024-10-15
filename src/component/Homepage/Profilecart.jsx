import { useEffect, useState } from "react"
import useFetch from "../utils/useFetch"
import { Link } from "react-router-dom"

function Profilecart({data , user}) {
  
    const [follow , setFollow] = useState('')
    const [pending , setPending] = useState(false)
    useEffect(()=>{
       
            if(user&& user.follower.includes(data._id)){
               setFollow('Following')
            }
            else {
                setFollow('Follow')
            }
      
    },[data._id] )
    function handlefollow(){
        if(follow==='Follow'){
            
            setPending(true)
            fetch(`http://localhost:3000/api/follow/${data._id}`,{
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
                fetch(`http://localhost:3000/api/unfollow/${data._id}`,{
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
    return (
        
    <div className=" "> 
        <div className="img flex items-center gap-5 w-80">
            <img className="w-16 h-16 rounded-[50%] object-cover" src={`http://localhost:3000/images/uploads/${data.photo}`} alt="" />
            {data.name && <Link to={`/profile/${data._id}`} className=" text-lg  text-wrap ">{data.name}</Link>}
            {!data.name && <Link to={`/profile/${data._id}`}className=" text-lg  text-wrap truncate w-24">{data.email}</Link>}
            <button disabled={pending} onClick={handlefollow} className="min-w-fit ml-5 justify-self-end bg-black text-white px-2 rounded ">{follow}</button>

        </div>
         
    </div>
  )
}

export default Profilecart