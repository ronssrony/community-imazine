
import Product from "./Product"



function Productlist({ products }) {
   
    return (
     <>

      <div className="products flex flex-wrap gap-5  w-full items-center relative  justify-center ">
       {products.map((product)=>(
        <div key={product._id} className=" w-1/4 relative ">
          <Product product={product}/>
          </div>
      ))}
      </div>
     
     </>

       

    )

  
}

export default Productlist