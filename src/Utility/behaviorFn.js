

function postlength(post,indicator,setTotalslide){
  if(post&& post.images && post.videos){
    if(post.images.length>0 || post.videos.length>0){
      indicator.current.style.display = 'block'
      setTotalslide(post.images.length+post.videos.length)
    }
  }
  else if(post && post.videos){
    if(post.videos.length>1){
      indicator.current.style.display ='block' ; 
      setTotalslide(post.videos.length)
    }
  }
  else if (post && post.images ) {
    if(post.images.length>1)
    {
      indicator.current.style.display = 'block'
      setTotalslide(post.images.length)
    
    }
  }
}

function rightIndicator(leftindicator, setPulse ,totalslide ,indicator ,index ,setIndex,slideitems, mediafiles){
    leftindicator.current.style.display = 'block'
    setPulse('')
    if(totalslide-2===index)
    {
      indicator.current.style.display = 'none'; 
    }
    if (totalslide - 1 > index) {
 
      setIndex(index + 1); 
      const overflow = slideitems[index + 1];
      mediafiles.scrollLeft += overflow.offsetWidth; 
    }
}

function leftIndicator(index ,leftindicator ,setIndex , mediafiles , slideitems){
    if(index==1) leftindicator.current.style.display ='none'
    if (index>0) {
     
      setIndex(index - 1); 
      const overflow = slideitems[index - 1];
      mediafiles.scrollLeft -= overflow.offsetWidth;
     
    }
}

export {postlength , rightIndicator , leftIndicator}