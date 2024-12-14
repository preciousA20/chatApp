import { useAuth } from "../../context/UseContext"
import { extractTime } from "../../util/ExtractTime"

interface ChattingMessageProps{
    message: string 
    currentUser: string 
}

const Message = ({message, currentUser}: ChattingMessageProps) => {
    const { authUser } = useAuth()
    const fromUs = message?.senderId === authUser?._id 
    const chatClassMate = fromUs ? 'chat-end' : 'chat-start'
    const profilePic = fromUs ? authUser?.profilePic : currentUser?.profilePic 
    const colorChange = fromUs ? 'bg-blue-500' : ''
    const formattedTime = extractTime(message?.createdAt)
    const shouldShaked = message.shouldShake ? "shake" : ""
  return (
    <div className={`chat ${chatClassMate}`}>
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                    <img src={profilePic} alt="proflie image" />
                </div>
            </div>

            <div className={`chat-bubble text-white ${colorChange} ${shouldShaked} pb-2`}>{message?.message}</div> 
            <div className='chat-footer text-xs flex gap-1 items-center text-yellow-400 font-semibold'>{formattedTime}</div>
    </div>
  )
}

export default Message