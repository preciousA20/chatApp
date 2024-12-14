import { useEffect, useRef } from "react"
import { useAuth } from "../../context/UseContext"
import MessageSkeleton from "../skeleton/MessageSkeleton"
import Message from "../chatting/Message"
import { useSocket } from "../../context/socket/SocketContext"
import notification from '../../assets/sounds/notification.mp3'
interface MessageProps {
    loadingNow: boolean
    messages: string[]
    setMessages: any 
    currentUser: string 
}

const ChatBody = ({loadingNow, messages, setMessages, currentUser}: MessageProps) => {
    const {authUser} = useAuth()
    const {socket} = useSocket()
    const lastMessageRef = useRef()

	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages])

  //const sound = new Audio(notification)

  useEffect(()=>{
      socket?.on("newMessage", (newMessage: any)=>{
        newMessage.shouldShake = true 
        const sound = new Audio()
        sound.src = notification
        sound.preload = 'auto'
        sound.play().catch(error=>console.log(error))
        setMessages([...messages, newMessage])
      }) 
      return ()=>socket?.off("newMessage")
  },[socket, setMessages, messages])

  return (

    <div className='chatbody px-4 flex-1 overflow-auto'>
        {!loadingNow &&
				messages?.length > 0 &&
				messages?.map((message) => (
				<div key={message?._id} ref={lastMessageRef}>
					<Message message={message} currentUser={currentUser}/>
				</div>
				))}


       {
        loadingNow && (
            [...Array(3)].map((_, id)=> <MessageSkeleton key={id} />)
        )
       }

        {!loadingNow && messages?.length === 0 && (
            <p className='text-center mt-4 font-bold'>
                <span className="text-yellow-500 font-bold">{authUser?.username}</span> Send a message to start the conversation</p>
		)}

       

    </div>

  )
}

export default ChatBody


// <div className='px-4 flex-1 overflow-auto'>
// 			{!loading &&
// 				messages.length > 0 &&
// 				messages.map((message) => (
// 					<div key={message._id} ref={lastMessageRef}>
// 						<Message message={message} />
// 					</div>
// 				))}

// 			{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
// 			{!loading && messages.length === 0 && (
// 				<p className='text-center'>Send a message to start the conversation</p>
// 			)}
// 		</div>