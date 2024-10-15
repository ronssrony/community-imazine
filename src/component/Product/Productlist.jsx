/* eslint-disable react/prop-types */

import { useState } from "react"
import Product from "./Product"

// import { Link } from "react-router-dom"


function Productlist({ products }) {
   


    return (
     <>

     
     
      <div className="products flex flex-wrap gap-2 px-20 w-full items-center justify-center font-[joan]">
  
      {products.map((product)=>(
        <div key={product._id} className=" min-w-60 w-1/4 relative ">
          <Product product={product}/>
          </div>
      ))}
      </div>
     
     </>

       

    )

  
}

export default Productlist