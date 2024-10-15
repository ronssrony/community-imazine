
import Sidebar from "../partial/Sidebar"
import PostShimmer from "../Shimmers/PostShimmer"
import useFetch from "../utils/useFetch"
import Productcart from "./Productcart"
import Profilecart from "./Profilecart"


function Home() {
  
  const {data , ispending , error} = useFetch('http://localhost:3000/api/postfeed')


  return (
   <>

   <Sidebar/>
    <div className="flex w-5/6 max-sm:w-full flex-col items-center max-lg:translate-y-48  lg:translate-y-20   lg:translate-x-48 ">
      {ispending && <PostShimmer/>}
      {error && <div>{error}</div>}
      {data &&  data.posts.map((post)=>
        <div className="flex flex-col items-center justify-center " key={post._id} >
        <Profilecart  data={post.referid} user={data.user}/>
        <Productcart   post={post} user={data.user} />
        </div>
        
      )
      
      }
    </div>
   
   </>
   
  )
}

export default Home