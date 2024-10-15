import  { useEffect, useState } from 'react'


function useFetch(url) {

  const [data , setData] = useState(null); 
  const [ispending , setPending] = useState(true); 
  const [error , setError] = useState(null) ;

  useEffect(()=>{


    fetch(url,{
      credentials:'include'
    })
    .then(res => {
       if(!res.ok) {throw Error("Some incorrect about Url or Data might be deleted")}
        return res.json()
    }).then(data =>{
        
        setData(data) ;
        setPending(false)
        
    }).catch(err=>{
       
        setError(err.message)
        setPending(false)
    })


 
  },[url])

  return {data , ispending, error}
}

export default useFetch