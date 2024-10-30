import Navbar from './component/partial/Navbar.jsx'
import Allproducts from './Pages/Allproducts.jsx'
import Login from './Pages/Login.jsx'
import Post from './Pages/Homepage.jsx'
import Viewprofile from './component/Profile/Viewprofile.jsx'
import Profile from './component/Profile/Profile.jsx';
import Message from './component/Profile/Message.jsx'
import Mymessages from './component/Profile/Mymessages.jsx'
import AccoutSetting from './component/Profile/AccoutSetting.jsx'
import Sidebar from './component/partial/Sidebar.jsx'
import Caller from './component/Profile/Caller.jsx'
import Receiver from './component/Profile/Receiver.jsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from './context/UserProvider.jsx'
import { NotificationProvider } from './context/Notification.jsx'
import { CallingBoardProvider } from './context/CallingBoard.jsx'
import { QueryClient , QueryClientProvider  } from '@tanstack/react-query'


 function App() {
 
  const queryClient = new QueryClient() ;

  
return (
    
<> 
 <UserProvider>
  <NotificationProvider>
   <CallingBoardProvider>
   <QueryClientProvider client={queryClient}>
 
    <Router>
    <div className="flex flex-col h-screen bg-[#F4F2EE] relative">

  <div className="fixed top-0 w-full h-16 bg-[#F4F2EE] z-50">
    <Navbar />
  </div>

  <div className="flex flex-1 pt-16">
   
    <div className="w-1/6 md:block hidden h-[calc(100vh-4rem)]  fixed top-16 left-0 bg-[#F4F2EE] ">
      <Sidebar />
    </div>
    <div className="md:w-5/6 w-full md:ml-[16.65%] relative overflow-y-auto h-full bg-[#F4F2EE]">
      <div className="p-5">
        <Routes>
          <Route exact path="/" element={<Post />} />
          <Route path="/profile/:userid" element={<Viewprofile />} />
          <Route path="/products" element={<Allproducts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/message/:receiverId" element={<Message />} />
          <Route path="/mymessages" element={<Mymessages />} />
          <Route path="/accountsetting" element={<AccoutSetting />} />
          <Route path="/videocall/:senderId/:receiverId" element={<Caller />} />
          <Route path="/reicevecalll/:senderId/:receiverId" element={<Receiver />} />
        </Routes>
      </div>
    </div>

  </div>
</div>

    </Router>
    </QueryClientProvider>
    </CallingBoardProvider>
    </NotificationProvider>
    </UserProvider>
</>
  

  )
}

export default App 