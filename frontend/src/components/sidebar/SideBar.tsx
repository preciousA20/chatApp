import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import SearchInput from '../searchinput/SearchInput'
import Conversation from '../conversation/Conversation'
import Logout from '../logout/Logout'

const SideBar = () => {

  const [loading, setLoading] = useState<boolean>(false)
  const [conversations, setConversations] = useState<string[] | any[]>([])



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
        setLoading(false)
      } catch (error: any) {
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