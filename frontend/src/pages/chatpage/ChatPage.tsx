import { useState, useEffect } from "react"
import ChatHeader from "../../components/chatConponents/ChatHeader"
import ChatBody from "../../components/chatConponents/ChatBody"
import ChatInputFooter from "../../components/chatConponents/ChatInputFooter"
import { useParams } from "react-router-dom"
import { useAuth } from "../../context/UseContext"
import toast from "react-hot-toast"
import useConversation from '../../zustand/useConversation'
// import { useNavigate } from "react-router-dom"

const ChatPage = () => {
  // const navigate = useNavigate()
  const params = useParams()
  const { authUser } = useAuth()
  const [currentUser, setCurrentUser] = useState('')
  const [loading, setLoading] = useState<boolean>(false)
  const {messages, setMessages} = useConversation()
  const [message, setMessage] = useState<string>('')
  const [loadingNow, setLoadingNow] = useState<boolean>(false)
  
  useEffect(()=>{
    const getUser = async()=>{
      try {
        const response = await fetch(`/api/user/${params.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        })
  
        const jsonRes = await response.json()
        if(jsonRes.error){
          throw new Error(jsonRes.error)
        }
        setCurrentUser(jsonRes)
      } catch (error: any) {
          toast.error(error.message)        
      }
    }
    if(params?.id) getUser()
  },[params.id])


  useEffect(()=>{
    const getMessages = async()=>{
      try {
        setLoadingNow(true)
        const response = await fetch(`/api/message/${currentUser._id}`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        })

        const jsonRes = await response.json()
        if(jsonRes.error){
          throw new Error(jsonRes.error)
        }
        setMessages(jsonRes)
        setLoadingNow(false)
      } catch (error: any) {
        if(error){
          toast.success(`${authUser?.username} Send a message to start chatting`)
        }        
      }finally{
        setLoadingNow(false)
      }
    }

    if(currentUser?._id) getMessages()
  },[currentUser._id, setMessages])
  

  // sending messages to beckend API 
  const handleSendMessage = async(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if(!message?.length){
      toast.error('Please, input message!')
      return false
    }
    try {
      setLoading(true)
      const res = await fetch(`/api/message/send/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({message}),
        credentials: 'include'
      })
      const jsonRes = await res.json()
      
      if(jsonRes.error){
        throw new Error(jsonRes.error)
      }
      setMessages([...messages, jsonRes])
      setMessage('')
      setLoading(false)
      
    } catch (error: any) {
      if(error){
        toast.error(error)
      }      
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className='chatpage flex   rounded-lg verflow-hidden bg-gray-500 bg-clip-padding backdrop-filter  bg-opacity-0'>
      <ChatHeader authUser={authUser} currentUser={currentUser}/>

      <ChatBody loadingNow={loadingNow} messages={messages} setMessages={setMessages} currentUser={currentUser}/>

      <ChatInputFooter handleSendMessage={handleSendMessage} loading={loading} setMessage={setMessage} message={message}/>
    </div>
  )
}

export default ChatPage