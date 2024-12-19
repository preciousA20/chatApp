
  
  const ChatHeader = ({authUser, currentUser}) => {
    return (
      <div className='flex flex-row justify-between w-full text-sm rounded-lg  p-2 bg-green-700'>
          <span className='text-yellow-500 font-bold uppercase'>{authUser?.username}</span>
          <span className='text-gray-900 font-bold'>chatting with</span>
          <span className='text-yellow-500 font-bold'>
            <span className="uppercase">{currentUser?.username}</span>
            
          </span>
      </div>
    )
  }
  
  export default ChatHeader