import { useState } from "react"
import { useNavigate } from "react-router-dom"
import CheckBox from "./CheckBox"
import toast from "react-hot-toast"
import { useAuth } from "../../context/UseContext"



const Register = () => {
  const { setAuthUser} = useAuth()
  //const {setAuthUser} = useContext(AuthContext)
  const navigate = useNavigate()
  //On successful registeration, navigate to login page
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    gender: ""
  })

  const hasLetter = /[a-zA-Z]/
  const hasNumber = /\d/
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/

  const handleSubmit = async(e)=>{
    e.preventDefault()
    if(!formData.username){
      toast.error('Username is required!')
      return false 
    }else if(!formData.gender){
      toast.error("No gender selected!")
      return false 
    }else if(formData.password?.length < 8){
      toast.error("Password must be 8 characters and above!")
      return false
    }else if(!hasLetter.test(formData.password)){
      toast.error('Password must contain letters!')
      return false 
    }else if(!hasNumber.test(formData.password)){
      toast.error('Password must contain Number(s)!')
      return false 
    }else if(!hasSpecialChar.test(formData.password)){
      toast.error('Password must contain special character(s)!')
      return false 
    }else if(formData.password !== formData.confirmPassword){
      toast.error('Password does not match!')
      return false 
    }
    setLoading(true)
    try {

      const response = await fetch("/api/auth/register",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      })
       
      const jsonResponse = await response.json()
      if(jsonResponse.error){
        throw new Error(jsonResponse.error)
      }
      localStorage.setItem('chat-user', JSON.stringify(jsonResponse))
      setAuthUser(jsonResponse)
      setLoading(false)
      toast.success(`Account created successfully ${formData.username}`)
      navigate('/')
    } catch (error) {
      if(error){
        toast.error(error?.message)
      }
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className="w-full max-w-md bg-yellow-400 pt-4 pb-4 pl-8 pr-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-black mb-6">
          Register On SpeedX.com  
        </h2>
        <form onSubmit={handleSubmit}  className="space-y-2">
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
              value={formData.username}
              onChange={(e)=>setFormData({...formData, username: e.target.value})}
              
              className="mt-1 block w-full px-3 py-2 border rounded-lg text-white focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-green-900"
            >
              Full Name 
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              autoComplete="on"
             value={formData.fullName}
             onChange={(e)=>setFormData({...formData, fullName: e.target.value})}
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
             value={formData.password}
             onChange={(e)=>setFormData({...formData, password: e.target.value})}
              required
              className="mt-1 block w-full px-3 py-2 border rounded-lg text-white focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-green-900"
            >
              Confirm Password
            </label>
            <input
              type="confirmPassword"
              id="confirmPassword"
              name="confirmPassword"
              autoComplete="on"
             value={formData.confirmPassword}
             onChange={(e)=>setFormData({...formData, confirmPassword: e.target.value})}
              required
              className="mt-1 block w-full px-3 py-2 border rounded-lg text-white focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <CheckBox formData={formData} setFormData={setFormData}/>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:cursor-pointer text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {loading ? (<div className="loading loading-infinity"></div>) : ("Sign Up")}
          </button>
        </form>

        <div className="text-black">
          Already have an account? <a href={'/'} className="text-blue-900 font-semibold hover:cursor-pointer underline">Login</a>
        </div>

      
      </div>
    </div>
  );
};

export default Register;
