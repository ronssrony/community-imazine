import Choice from "./Choice"
function Productcart({ posts , profile }) {

 
  return (
    <>
     {posts && posts.map((post)=>
          <div key={post._id} className="">
             <Choice post={post} profile={profile}/>
          </div>
     )
     
     }
    </>
  )
}

export default Productcart