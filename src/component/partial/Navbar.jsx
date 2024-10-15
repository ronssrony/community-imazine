import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";


function Navbar(){
   const [link , setLink] = useState('Log In') ;
   const [hyperlink , sethyperLink] = useState('/login') ;
   const searchbar = useRef(null)
   const infobar = useRef(null)
   const [lastScroll , setLastScroll] = useState(null)
   
   const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScroll) {
      searchbar.current.style.opacity = '0';
      searchbar.current.style.transition = '.2s';  
      infobar.current.style.opacity = '0';
      infobar.current.style.transition = '.2s ';
      setTimeout(() => {
            searchbar.current.style.display = 'none'
            infobar.current.style.display = 'none'
      }, 100);  
    } 
   
    else {
      searchbar.current.style.opacity = '100'; 
      searchbar.current.style.transition = '.2s';  
      infobar.current.style.opacity = '100'; 
      infobar.current.style.transition = '.2s'; 
      setTimeout(() => {
        searchbar.current.style.display = 'flex'
        infobar.current.style.display = 'flex'
  }, 100); 
    }

    setLastScroll(currentScrollY);
  };

  useEffect(() => {
    if(window.innerWidth<1024) window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScroll]);

   useEffect(()=>{
      
   fetch('http://localhost:3000/api/middleware',{
    credentials: 'include'
   }).then((res)=>{
     if(res.ok) { return res.json()} 
     else {
      throw Error('user not logged in')
     }
   }).then((data)=>{
       if(data.message==='valid')
        {
        setLink('Profile') 
        sethyperLink('/profile') 
      }
   }).catch((err)=>
  console.log(err.message))
    },[])
   return(
      <div   className="bg-white w-full xl:h-24 h-28 max-sm:h-20 shadow-sm    flex max-lg:flex-col fixed z-50   ">
      <div className="lg:w-1/2  md:w-full min-w-fit md:h-24 max-sm:h-12  h-24 p-5 ">
          <Link to="/" className="w-full h-full relative ">
              <img className="w-3/2 h-20 max-sm:h-12 object-cover" src="/images/imazinistblack.png" alt=""/>
          </Link>
          <div  className="flex text-black gap-5 mt-2 infowala relative    ">
              
              <div ref={infobar} className=" bg-white text-black w-full  flex justify-start gap-5    relative lg:hidden  "> 
                 
              <Link  to={`/products`} className="text-nowrap ">All Products</Link>
              <Link  to={`${hyperlink}`} className="">{link}</Link>
              <a href="text-black" className="">Help</a>
            </div>
          </div>
      </div>
  
      <div ref={searchbar}  className="bg-white xl:flex lg:flex-col md:flex-col max-md:flex-col xl:flex-row  ">
        <div className="searchwala max-md:py-10 max-sm:py-5 max-md:px-5 max-sm:px-0 md:py-10 md:px-5 max-sm:w-full max-lg:w-full   md:w-96 max-md:w-96 relative flex md:mr-2 max-sm:absolute max-lg:absolute max-md:absolute max-md:top-24 max-lg:top-24 max-sm:top-24 ">
          <input type="search" size="45" autoComplete="off" name="search" className="absolute max-lg:w-full  p-1 max-sm:border max-sm:border-black outline-none  bg-white border border-black"/> <label htmlFor="search" className="right-0 absolute p-1 opacity-60 font-light max-sm:text-black">SEARCH</label>
      </div>
      <div className="  lg:ml-10 md:ml-10 xl:py-10 max-sm:w-60 max-md:w-72 lg:w-72 max-lg:w-60   text-black   px-2 flex justify-between  relative max-lg:hidden"> 
              
      <Link  to={`/products`} className="">All Products</Link>
      <Link  to={`${hyperlink}`} className="">{link}</Link>
        <a href="">Help</a>
      </div>
      </div>
     
  </div>

   ) ;
}

export default Navbar 