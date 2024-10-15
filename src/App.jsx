import Navbar from './component/partial/Navbar.jsx'
import Allproducts from './component/AllProducts/Allproducts.jsx'
import Login from './component/Login/Login.jsx'
import Post from './component/Homepage/Post.jsx'
import Viewprofile from './component/Profile/Viewprofile.jsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from './component/Profile/Profile.jsx';
import Message from './component/Profile/Message.jsx'
import Mymessages from './component/Profile/Mymessages.jsx'
import AccoutSetting from './component/Profile/AccoutSetting.jsx'
import {SocketProvider} from "./context/Socketprovider.jsx"
import Videocall from './component/Profile/Videocall.jsx'
import Oppvideocall from './component/Profile/Oppvideocall.jsx'
 function App() {
  return (


   <Router>
    <SocketProvider>
    <div className="w-full ">
    <Navbar/>
    <div className="content">
    <Routes>
    
    
    <Route exact path="/" element={<Post/>} />
    <Route exact path="/profile/:userid" element={<Viewprofile/>} />
    <Route  path="/products" element={<Allproducts/>} />
     <Route path='/login' element={<Login/>} />
     <Route path='/profile' element={<Profile/>}/>
     <Route path='/message/:receiverId' element={<Message/>}/>
     <Route path='/mymessages' element={<Mymessages/>}/>
     <Route path='/accountsetting' element={<AccoutSetting/>}/>
     <Route path='/videocall/:senderId/:receiverId' element={<Videocall/>} />
     <Route path='/receivevideocall' element={<Oppvideocall/>} />
    
    </Routes>
    </div>

    </div>
    </SocketProvider>
    </Router>
  

  )
}

export default App 