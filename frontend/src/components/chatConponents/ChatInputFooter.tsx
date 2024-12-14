
import { BsSend } from 'react-icons/bs'

interface ReceivedProps {
  handleSendMessage: any
  loading: boolean 
  setMessage: any
  message: string 
}

const ChatInputFooter = ({handleSendMessage, loading, setMessage, message}: ReceivedProps) => {
  return (
    <form onSubmit={handleSendMessage}>
        <div className='flex justify-between border w-full text-sm rounded-lg  p-2.5 bg-gray-700 border-gray-300 text-white'>
            <input 
                type="text" 
                className='bg-gray-700 text-white w-full outline-none'
                placeholder='send message...'
                value={message}
                onChange={(e)=>setMessage(e.target.value)} 
            />
            <button type='submit' className='ml-2'>
                {!loading ? (
                  <BsSend className='text-white font-bold w-5 h-5'/>
                ) : (
                  <div className="loading loading-spinner"></div>
                )}
            </button>
        </div>
    </form>
  )
}

export default ChatInputFooter