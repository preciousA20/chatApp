import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/UseContext"



const PrivateRoutes = () => {
  const {authUser} = useAuth()
  return (
    <>
      {authUser ? <Outlet /> : <Navigate to={'/'}/>} 
    </>
  )
}

export default PrivateRoutes