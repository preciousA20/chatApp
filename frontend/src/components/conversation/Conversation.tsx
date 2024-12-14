
import { useSocket } from "../../context/socket/SocketContext"
import SignUpLoader from "../SignUpLoader"

interface ConversationProps {
  loading: boolean 
  conversations: string[] | any 
}
const Conversation = ({loading, conversations}: ConversationProps) => {
    const {onlineUsers} = useSocket()
    
    // const items = Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`)
    
  return (
    <>
    {loading ? (
      <SignUpLoader />
    ) : (
      <div className='item-list'>
        {conversations.map((user: any, index: number) => (
          <a href={`/chat/${user?._id}`} key={index} className="item flex  items-center  justify-between">
            <div className={`avatar ${onlineUsers?.find((person)=>person ===user._id ) && "online" } w-10 rounded-full`}>
              <img src={user?.profilePic} alt="profile picture" className="rounded-full"/>
            </div>

            <div className="text-white font-semibold hover:underline">
              {user?.fullName}
            </div>
            
          </a>
        ))}
    </div>
    )}
    </>
  )
}

export default Conversation