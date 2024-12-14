import {FormEvent, useState} from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import SignUpLoader from '../../components/SignUpLoader'
import { useAuth } from '../../context/UseContext'


const Login = () => {
  const {setAuthUser} = useAuth()
  // remember to navigate to the welcome page on successful login
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  })

  const handleSubmit = async(e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    try {
      setLoading(true) 
      const response = await fetch('/api/auth/login',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      })

      const responseJson = await response.json()
      
      if(responseJson.error){
        throw new Error(responseJson.error)
      }

      localStorage.setItem('chat-user', JSON.stringify(responseJson))
      setAuthUser(responseJson)
      toast.success(`Verification successfull ${formData.username}`)
      setLoading(false)
      navigate('/welcome')

    } catch (error: any) {
      if(error){
        toast.error(error.message)
      }
    }finally{
      setLoading(false)
    }
  }

  return (
    
   <>
   {loading ? (<SignUpLoader />) : (
     <div className="flex justify-center items-center min-h-screen ">
     <div className="w-full max-w-md bg-yellow-400 pt-4 pb-4 pl-8 pr-8 rounded-lg shadow-lg">
       <h2 className="text-2xl font-semibold text-center text-black mb-6">
         Verify Your Identity On SpeedX.com 
       </h2>
       <form onSubmit={handleSubmit} className="space-y-2">
         <div>
           <label
             htmlFor="username"
             className="block text-sm font-medium text-green-900"
           >
             Username 
           </label>
           <input
             type="text"
             id="username"
             name="username"
             autoComplete="on"
             placeholder='Enter username...'
             value={formData.username}
             onChange={(e)=>setFormData({...formData, username: e.target.value})}
             required
             className="mt-1 block w-full px-3 py-2 border rounded-lg text-white focus:ring-blue-500 focus:border-blue-500"
           />
         </div>

         <div>
           <label
             htmlFor="password"
             className="block text-sm font-medium text-green-900"
           >
             Password 
           </label>
           <input
             type="password"
             id="password"
             name="password"
             autoComplete="on"
             placeholder='Enter password...'
             value={formData.password}
             onChange={(e)=>setFormData({...formData, password: e.target.value})}
             required
             className="mt-1 block w-full px-3 py-2 border rounded-lg text-white focus:ring-blue-500 focus:border-blue-500"
           />
         </div>

         <button
           type="submit"
           className="w-full py-2 bg-blue-600 hover:cursor-pointer text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
         >
           Login
         </button>
       </form>

       <div className="text-black">
         Dont have an account? <a href={'/register'} className="text-blue-900 underline font-semibold hover:cursor-pointer">Create Account</a>
       </div>

     
     </div>
   </div>
   )}
   </>
 
  )
}

export default Login