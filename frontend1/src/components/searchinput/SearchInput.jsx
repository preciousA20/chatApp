import { useState } from "react"
import { FaSearch } from "react-icons/fa"
import toast from "react-hot-toast"

const SearchInput = ({conversations, setConversations}) => {
  const [input, setInput] = useState('')


  const quickSearch = async(e)=>{
    e.preventDefault()
    if(!input) return 
    const result = conversations?.find((user)=>user.fullName?.toLowerCase()?.includes(input.toLowerCase()))
    //console.log("THE SEARCHED USER", result)
    if(result){
      setConversations([result])
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