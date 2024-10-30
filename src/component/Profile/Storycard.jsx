
import baseUrl from "../../baseUrl"
function Storycard({story}) {
  return (
    <div className="storycard h-48 w-36  rounded-md overflow-hidden">
         <img className="h-full w-full object-cover" src={`${baseUrl}/images/uploads/${story}`} alt="" />       
    </div>
  )
}

export default Storycard