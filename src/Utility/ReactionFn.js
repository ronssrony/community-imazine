import baseUrl from "../baseUrl";


function ReactionFn(react , setReact , dope, setDope , history, post){

    if(dope==='Dope') { 
        setReact(react+1) ; setDope('Undope')
        fetch(`${baseUrl}/api/dope/${post._id}`,{
          credentials:'include'
        }).then((res)=>{
          if(res.ok) return res.json() 
            else {
           throw Error('Not Doped')
            }
        }).then((info)=>{
          if(info.message==='login')
          {
            history('/login')
          }
          console.log(info.message)
        }).catch((err)=>{
          console.log(err.message)
        })
      }

     else {
      setDope('Dope');  setReact(react-1)
      fetch(`${baseUrl}/api/undope/${post._id}`,{
        credentials:'include'
      }).then((res)=>{
        if(res.ok) return res.json() 
          else {
         throw Error('Not Doped')
          }
      }).then((info)=>{
        if(info.message==='login')
        {
          history('/login')
        }
        console.log(info.message)
      }).catch((err)=>{
        console.log(err.message)
      })
           
     }
}

export default ReactionFn