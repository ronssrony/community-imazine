

function Storycard({story}) {
  return (
    <div className="storycard h-48 w-36  rounded-md overflow-hidden">
         <img className="h-full w-full object-cover" src={`http://localhost:3000/images/uploads/${story}`} alt="" />       
    </div>
  )
}

export default Storycard