
import { useSocket } from "../../context/socket/SocketContext"
import SignUpLoader from "../SignUpLoader"

const Conversation = ({loading, conversations}) => {
    const {onlineUsers} = useSocket()
    
    // const items = Array.from({ length: 1000 }, (_, i) => `Item ${i + 1}`)
    
  return (
    <>
    {loading ? (
      <SignUpLoader />
    ) : (
      <div className='item-list'>
        {conversations?.map((user, index) => (
          <a href={`/chat/${user?._id}`} key={index} className="item flex  items-center  justify-between">
            <div className={`avatar ${onlineUsers?.find((person)=>person ===user._id ) && "online" } w-10 rounded-full`}>
              <img src={user?.profilePic} alt="profile picture" className="rounded-full"/>
            </div>

            <div className="text-white font-semibold underline">
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