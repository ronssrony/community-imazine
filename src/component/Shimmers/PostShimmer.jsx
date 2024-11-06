
function PostShimmer() {
  return (
    <div className=" flex flex-col items-center justify-center  "  >
        <div className="img flex items-center gap-5 w-96">
            <img className="w-16 min-w-16 h-16 rounded-[50%] object-cover bg-slate-300 animate-pulse"   alt="" />
           <div  className=" text-lg w-24 h-5 rounded text-wrap bg-slate-300 animate-pulse "></div >
            <div className=" text-lg bg-slate-300  text-wrap truncate "></div >
            <button  className="min-w-fit ml-20 justify-self-end bg-slate-300 animate-pulse text-white px-2 h-5 w-24  rounded "></button>

        </div>
        <div className='h-auto mb-10 flex-col items-center  '>
         <div className="productimg mt-2 h-96 relative">
            <img className='h-full min-w-96  object-cover bg-slate-300 animate-pulse'  alt="" />
           
         </div>
        <div className="reaction"> 
            <p className='mb-1 mt-1 text-slate-300 bg-slate-300 animate-pulse max-w-20'> Dope</p>
            <div className='reactionbtn flex justify-between px-2   text-lg bg-slate-300 text-white w-96 min-w-96'>
                <button className='border-r w-[30%] border-white animate-pulse '></button>
                <button className='reviews border-r w-[40%] border-white animate-pulse  text-slate-300'>Reviews</button>
                <button className='w-[30%] animate-pulse text-slate-300'>Share</button>gh
            </div>
        </div>
    </div>
        </div>
        
  )
}

export default PostShimmer