
import moment from 'moment';
import baseUrl from '../../baseUrl';
function Reviews({comment}) {
  return (
    
    <div >
    <div className='font-semibold profile flex text-[13px] items-center gap-1 mb-1  '>
     <img className='w-10 h-10 rounded-[50%] object-cover' src={`${baseUrl}/images/uploads/${comment.referid.photo}`} alt="" />
     <h1  >{comment.referid.name}
     <p className=' absolute left-12  text-[10px]'>{moment.utc(comment.createdAt).fromNow()}</p>
     </h1>
    </div>
 
    <div className=' ml-10 text-sm max-w-full break-words px-2 '>
     <p >{comment.content}</p>
    </div>

   </div>
  )
}

export default Reviews