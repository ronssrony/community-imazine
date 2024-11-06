import { useEffect, useState } from "react"
import baseUrl from "../../baseUrl"
import { Link } from "react-router-dom"
import FollowFunc from "../../Utility/FollowFn"
import { UseLoginContext } from "../../context/LoginProvider"
function Profilecart({data , user , size}) {
    const [follow , setFollow] = useState('')
    const [pending , setPending] = useState(false)
    const {handleDialog} = UseLoginContext() ;
    
    useEffect(()=>{     
            if(user&& user.follow.includes(data._id)){
               setFollow('Following')
          
            }
            else {
                setFollow('Follow')
            }    
    },[] )
    function handlefollow(){
        if(!user){
            handleDialog(); 
            return  ;
        }
        FollowFunc(follow ,setPending ,setFollow , data ) ;
    }
    return (
        
    <div className={`w-${size}`}> 
        <div className="img flex items-center   gap-5 w-full relative z-20">
            <img className="w-16 h-16 rounded-[50%] object-cover" src={`${baseUrl}/images/uploads/${data.photo}`} alt="" />
            {data.name && <Link to={`/profile/${data._id}`} className=" text-lg  text-wrap  ">{data.name}</Link>}
            {!data.name && <Link to={`/profile/${data._id}`} className=" text-lg  text-wrap truncate w-24">{data.email}</Link>}
            <button disabled={pending} onClick={handlefollow} className="min-w-fit ml-auto justify-self-end  bg-black text-white px-2 rounded ">{follow}</button>

        </div>
         
    </div>
  )
}

export default Profilecart