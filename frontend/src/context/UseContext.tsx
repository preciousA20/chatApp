import { createContext, useContext, useState } from "react"


interface AuthContextType {
    authUser: string | null;
    setAuthUser: (user: string | null) => void;
  }
export const AuthContext = createContext<AuthContextType | null>(null)

const AuthProvider = ({children}:{children: React.ReactNode})=>{
    
    const [authUser, setAuthUser] = useState<string | null>(
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


export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}