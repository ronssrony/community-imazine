import React from 'react'
import { useState } from 'react'  
import baseUrl from '../../baseUrl'
  


function Product({product}) {
  const [message, setMessage] = useState('')
function choicelist(params){

  fetch(`${baseUrl}/api/choicelist/${params}`,{
   headers:{
     'content-type':'application/json'
   } ,
   credentials:'include' 
  }).then((res)=>{
   if(res.ok) return res.json()
     else {
   throw Error('Something went wrong')}
  }).then((data)=>{
   setMessage(data.message)
   setTimeout(() => {
     setMessage('')
   }, 1500);
  })
  .catch((err)=>{
 console.log(err.message)
})
}
  return (

    <div className="product-detail text-black  flex flex-col w-full relative"  >
     <div className='notify absolute bg-white bg-opacity-80 top-52 w-full   text-center '>{message}</div>
    <img className="" src={`${baseUrl}/images/uploads/${product.image}`} alt="" />
    <button onClick={()=>{choicelist(product._id)}} title="Add to your choicelist" className=" active:bg-stone-50 bg-transparent border-b border-black flex  flex-col items-center   text-xl">+<p className="  text-[10px]">Add To Your Choicelist</p></button>
     <div className="flex justify-around mt-2">
     <h1 className="inline truncate ">{product.name}</h1> <p className="inline-block">{product.price}</p>
     </div>
  </div>
  )
}

export default Product