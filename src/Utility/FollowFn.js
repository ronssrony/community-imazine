import baseUrl from "../baseUrl";

function FollowFunc(follow ,setPending ,setFollow , data ){
    console.log("Pressing Following")
        if(follow==='Follow'){
            
            setPending(true)
            fetch(`${baseUrl}/api/follow/${data._id}`,{
                credentials:'include'
            }).then((res)=>{
            
                if(res.ok) {setFollow("Following") ;setPending(false); res.json()}  
                    else {
                 setFollow("Try Again")
                throw Error("something went wrong")      
            }
            }).catch((err)=>{
                console.log(err.message)
            })
        }
        else if(follow==='Following') {
                console.log('pressing unfollow ',data._id)
                setPending(true)
                fetch(`${baseUrl}/api/unfollow/${data._id}`,{
                    credentials:'include'
                }).then((res)=>{
                
                    if(res.ok) {
                        setPending(false)
                        setFollow("Follow") ; 
                        res.json()
                    }  
                    else {
                        
                     setFollow("Try Again")
                    throw Error("something went wrong")      
                }
                }).catch((err)=>{
                    
                    console.log(err.message)
                })
            
        }

}

export default FollowFunc