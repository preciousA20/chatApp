import { createContext, useState, useEffect, useContext } from "react"
import io from 'socket.io-client'
import { useAuth } from "../UseContext"


export const SocketContext = createContext(null)

export const SocketProvider = ({children})=>{
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const {authUser} = useAuth()

    useEffect(()=>{
        if(authUser){
            const socket = io('https://chatapp-1-69r8.onrender.com', {
                query: {
                    userId: authUser._id 
                }
            })

            setSocket(socket)

            socket.on("getOnlineUsers", (users)=>{
                setOnlineUsers(users)
            })

            return ()=>socket.close()
        }else{
            if(socket){
                socket.close()
                setSocket(null)
            }
        }
    },[authUser])

    return (
        <SocketContext.Provider value={{
            socket,
            onlineUsers,
        }}>{children}</SocketContext.Provider>
    )
}


export const useSocket = () => {
    const context = useContext(SocketContext)
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider")
    }
    return context;
}