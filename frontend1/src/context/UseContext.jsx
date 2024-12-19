import { createContext, useContext, useState } from "react"


export const AuthContext = createContext(null)

const AuthProvider = ({children})=>{
    
    const [authUser, setAuthUser] = useState(
        () => JSON.parse(localStorage.getItem('chat-user') || 'null')
      );

    return (
        <AuthContext.Provider value={{
            authUser,
            setAuthUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider


export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}