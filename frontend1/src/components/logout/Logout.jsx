import { useState} from "react"
import { BiLogOut } from "react-icons/bi"
import { useAuth } from "../../context/UseContext"
import toast from "react-hot-toast"


const Logout = () => {
  const [loading, setLoading] = useState(false)


  const {authUser ,setAuthUser} = useAuth()
 

  const handleLogout = async()=>{
    try {
      setLoading(true)
      const response = await fetch("/api/auth/logout", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include' 
      })

      const data = await response.json()
      if(data.error){
        throw new Error(data.error)
      }

      localStorage.removeItem('chat-user')
      setAuthUser(null)
      setLoading(false) 
      //navigate('/')
    } catch (error) {
      if(error){
        toast.error(error.message)
      }
    }finally{
      setLoading(false)
    }
  }



  return (
    <div className='logout flex justify-between'>
      {
        loading ? ("Processing...") : (
          <button onClick={handleLogout} type="button" className="hover:cursor-pointer">
            <BiLogOut  className="w-6 h-6 text-white"/>
          </button>
        )
      }

      <span className="font-semibold">{authUser?.fullName}</span>
      
      <button >
        <img src={authUser?.profilePic} alt="profile picture" width={30} height={30} className="rounded-full border-light-500"/>
      </button>
    </div>
  )
}

export default Logout