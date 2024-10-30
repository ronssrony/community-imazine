import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import { RiCircleFill } from '@remixicon/react'
import useFetch from '../utils/useFetch'
import baseUrl from '../../baseUrl'
import socket from '../../service/socket'
function People({data, width }) {
  const [receivemessage , setReceivemessage] = useState([])
  const [senderId , setSenderId] = useState([])
  const [active, setActive]  = useState()
  const { data:activestatus , ispending , error}=useFetch(`${baseUrl}/api/activestatus/${data._id}`) 

  useEffect(()=>{
    socket.on('active_userlist', (list)=>{
        if(data._id===list){
          setActive(true )
        }
    })

    socket.on('offline_userlist', (list)=>{
        console.log("logout id" , list)
         if(data._id===list){
          setActive(false) ;
         } 
    })
    socket.on('popmessage',(data)=>{
        console.log(data)      
        fetch(`${baseUrl}/api/fetchuserid`,{
          credentials:'include'
        }).then((res)=>{
          if(res.ok) return res.json()
              else {
          throw Error("something went wrong in mymessage useEffect")}
        }).then((id)=>{     

             if((id.message===data.receiverId)){                   
               setReceivemessage(data.message)
               setSenderId(data.senderId)
             }
        
        })
     })
},[socket])
  return (
    <div className=''>
    <div className='flex items-center gap-5'>
        <Link to={`/message/${data._id}`} className={`flex items-center gap-2 max-sm:w-full  max-lg:w-1/2 ${width} truncate`}> 
            <img className="w-12 h-12 rounded-[50%] object-cover" src={`${baseUrl}/images/uploads/${data.photo}`} alt="" />
        <div>
        {data.name && <h1 name="user" className=" text-lg  text-wrap ">{data.name}</h1>}
        {!data.name &&<h1 name="user" className=" text-lg  text-wrap w-24 truncate ">{data.email}</h1> }
        {data._id===senderId ? <p1 className='absolute text-[14px] font-semibold'>{receivemessage} </p1> : <h1></h1> }
        </div>
        </Link>
        { active|| activestatus && activestatus.status.active? <h1 className='flex items-center gap-1'> <RiCircleFill color='green' size={10}/> <p className='text-[12px]'>Active Now</p> </h1> : <h1 className='flex items-center gap-1'> <RiCircleFill  size={10}/> <p className='text-[12px]'>Offline</p> </h1> }
    </div>
      
   
    </div>
  )
}

export default People