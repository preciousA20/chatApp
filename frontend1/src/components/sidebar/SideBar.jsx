import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import SearchInput from '../searchinput/SearchInput'
import Conversation from '../conversation/Conversation'
import Logout from '../logout/Logout'

const SideBar = () => {

  const [loading, setLoading] = useState(false)
  const [conversations, setConversations] = useState([])
  console.log(conversations)


  useEffect(()=>{
    const getUsers = async()=>{
      try {
        setLoading(true)
        const response = await fetch('/api/user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        })

        const resJson = await response.json()
        if(resJson.error){
          throw new Error(resJson.error)
        }

        setConversations(resJson)
        console.log(conversations)
        setLoading(false)
      } catch (error) {
        if(error){
          toast.error(error.message)
        }        
      }finally{
        setLoading(false)
      }
    }
    getUsers()
  },[])

  return (
    <div className='sidebar'>
        <SearchInput conversations={conversations} setConversations={setConversations}/>
        <div className='divider px-3'></div>
        <Conversation loading={loading} conversations={conversations}/>
        <Logout />
    </div>
  )
}

export default SideBar