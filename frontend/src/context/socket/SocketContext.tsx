import { createContext, useState, useEffect, useContext } from "react"
import io from 'socket.io-client'
import { useAuth } from "../UseContext"

interface ContextProps{
    socket: any  
    onlineUsers: string[] | any[]
}
export const SocketContext = createContext<ContextProps | null>(null)

export const SocketProvider = ({children}:{children: React.ReactNode})=>{
    const [socket, setSocket] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState<string[] | any[]>([])
    const {authUser} = useAuth()

    useEffect(()=>{
        if(authUser){
            const socket = io('http://localhost:3500', {
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


export const useSocket = (): ContextProps => {
    const context = useContext(SocketContext)
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider")
    }
    return context;
}