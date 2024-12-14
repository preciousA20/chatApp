import {Route, Routes} from 'react-router-dom'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import './App.css'
import Home from './pages/Home/Home'
import ChatPage from './pages/chatpage/ChatPage'
import WelcomeScreen from './components/WelcomeScreen'
import PrivateRoutes from './hooks/PrivateRoutes'
import { Toaster } from 'react-hot-toast' 

function App() {
 
  return (
   <div className='p-4 h-screen flex items-center justify-center'>
    <Routes>  
      {/* Protected Routes */}
      <Route element={<PrivateRoutes />}>
        <Route path='/welcome' element={<WelcomeScreen />}/>
        <Route path='/chat' element={<Home />}/>
        <Route path='/chat/:id' element={<ChatPage />}/>
      </Route>

      <Route path='/' element={<Login />}/>
      <Route path='/register' element={<Register />}/>
      
    </Routes>
    <Toaster />
   </div>
  )
}

export default App
