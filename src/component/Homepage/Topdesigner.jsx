import { RiUserAddLine, RiUserFollowLine } from "@remixicon/react"
import { useEffect, useState } from "react"
import baseUrl from "../../baseUrl"
import { Link } from "react-router-dom"
import FollowFunc from "../../Utility/FollowFn"
import { UseLoginContext } from "../../context/LoginProvider"
function Topdesigner({data , user }) {
  
    const [follow , setFollow] = useState('')
    const [pending , setPending] = useState(false)
    const {handleDialog} = UseLoginContext() ;
    useEffect(()=>{
       
            if(user&& user.follow.includes(data._id)){
               setFollow( "Following" )
            }
            else {
                setFollow( "Follow" )
            }
      
    },[data._id] )
    
    function handlefollow(){
      if(!user){
        handleDialog(); 
        return  ;
    }
      FollowFunc(follow ,setPending ,setFollow , data ) ;
    }  
    return (
        
    <div className={` w-72 mt-2  `}> 
        <div className="img flex items-center  justify-between relative z-100">
            <img className="w-14 h-14 rounded-[50%] object-cover " src={`${baseUrl}/images/uploads/${data.photo}`} alt="" />
            {data.name && <Link to={`/profile/${data._id}`} className=" text-md  text-wrap w-1/3 ">{data.name} <p className="text-[10px] text-opacity-50 text-black ">{data.follower.length} followers</p></Link>}
            {!data.name && <Link to={`/profile/${data._id}`} className=" text-md text-wrap truncate w-24">{data.email}  <p className="text-[10px] text-opacity-50 text-black ">{data.follower.length} followers</p></Link>}
            <button disabled={pending} onClick={handlefollow} className="min-w-fit  justify-self-end   text-black font-bold text-md px-1  py-1 rounded w-1/4  ">{follow==="Following"?<i title="Following"><RiUserFollowLine></RiUserFollowLine></i>:<i title="Follow"><RiUserAddLine/></i>}</button>

        </div>
         
    </div>
  )
}

export default Topdesigner