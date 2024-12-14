import { useState } from "react"
import { FaSearch } from "react-icons/fa"
import toast from "react-hot-toast"

interface ConversationsProps {
  conversations: any 
  setConversations: any 
}

const SearchInput = ({conversations, setConversations}: ConversationsProps) => {
  const [input, setInput] = useState<string>('')


  const quickSearch = async(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if(!input) return 
    const result = conversations?.find((user: any)=>user.fullName?.toLowerCase()?.includes(input.toLowerCase()))
    if(result){
      setConversations(result)
    }else{
      toast.error(`The searched result ${input} not found!`)
    }
    setInput('')
  }


  return (
    <form className='search-container' onSubmit={quickSearch}>
        <input 
          type='text' 
          className=' rounded-full outline-none search-input'
          value={input}
          onChange={(e)=>setInput(e.target.value)}
        />
        <button className='btn btn-circle bg-sky-500 text-white'>
            <FaSearch className="w-4 h-4 outline-none"/>
        </button>
    </form>
  )
}

export default SearchInput