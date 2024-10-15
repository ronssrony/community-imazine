

import useFetch from '../utils/useFetch'
import Productlist from '../Product/Productlist';

function Allproducts() {

   
  const {data , ispending , error} = useFetch("http://localhost:3000/api/products")


  return (

    <div className='h-screen translate-y-48'>
    {error && <div className='loading flex w-full h-screen justify-center items-center'> {error} </div>}
     {ispending && <div className='loading flex w-full h-4/6 justify-center items-center'> <div className='w-10 h-10 rounded-3xl border-4 border-red-400 stroke-pink-500'></div> </div>}
     <div className='blogs'>
      { data && <Productlist products={data} title="All Products"/>}
    </div>
   </div>
  ) ;

}


export default Allproducts