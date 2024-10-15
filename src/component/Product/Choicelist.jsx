import Choice from "./Choice"




function Productcart({ posts }) {

    
  return (
    <>
     {posts && posts.map((post)=>
          <div key={post._id} className="">
             <Choice post={post}/>
          </div>
     )
     
     }
    </>
  )
}

export default Productcart