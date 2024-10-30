import React from 'react'

function Designershimmer() {
  return ( 
         <div className={` w-full mt-2`}> 
    <div className="img flex items-center  justify-between relative z-100">
        <div className="w-14 h-14 rounded-[50%] object-cover  bg-slate-300 "  alt="" > </div>
        <div  className=" text-md  text-wrap w-1/3 bg-slate-300 px-4 rounded "> <h1 className='opacity-0'>ronssrony</h1> <p className="text-[10px] bg-slate-300 bg-opacity-50 text-opacity-50"></p></div>
        
        <button  className="min-w-fit  justify-self-end opacity-0  text-black font-bold text-md px-1  py-1 rounded w-1/4  "></button>

    </div>
     </div>
  )
}

export default Designershimmer