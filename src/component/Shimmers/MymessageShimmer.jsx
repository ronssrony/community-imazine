import { RiCircleFill } from "@remixicon/react"

function MymessageShimmer() {
  return (
    <div className='flex items-center gap-5 mt-5 animate-pulse'>
    <div className='flex items-center gap-2 max-sm:w-full  max-lg:w-1/2 w-1/6 truncate'> 
        <img className="w-12 h-12 rounded-[50%] object-cover bg-slate-300 animate-pulse" alt="" />
    <div>
   <h1  className=" text-lg  text-wrap bg-slate-300 rounded w-28 h-5 animate-pulse "></h1>
   <p1 className='absolute text-[14px] font-semibold'></p1> 
    </div>
    </div>
    <h1 className='flex items-center gap-1'> <RiCircleFill color='' size={10}/> <p className='text-[12px] bg-slate-300 animate-pulse w-12'></p> </h1>
    
</div>
  )
}

export default MymessageShimmer