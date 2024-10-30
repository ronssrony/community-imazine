import baseUrl from "../baseUrl";

function reviewSubmit(e,post,textarearef,setComments){
    e.preventDefault() ;
    let form =e.target ; 
    let formdata = new FormData(form) ; 
    fetch(`${baseUrl}/api/review/${post._id}`,{
       method:"POST" ,
      credentials:'include' ,
      body:formdata
    }).then((res)=>{
      if(res.ok) return res.json() 
       else {
     throw Error('something went wrong on reviewsubmit')}
    }).then((comments)=>{
     textarearef.current.value = ''; 
       setComments(comments)

    }).catch((err)=>{
     console.log(err.message)
    })
}

function getReview(reviewbox ,setReviewbox ,setComments,post){
    if(reviewbox==='hidden')
        {
          setReviewbox('block')
          fetch(`${baseUrl}/api/reviews/${post._id}`,{
            credentials:'include'
          }).then((res)=>{
             if(res.ok) return res.json() ;
             else {
              throw Error('No comments are found')
             }
          }).then((comments)=>{
           
             setComments(comments) ;
          })

        }

        else if(reviewbox==='block') {
          setReviewbox("hidden")
        }
}

export  {reviewSubmit,getReview}