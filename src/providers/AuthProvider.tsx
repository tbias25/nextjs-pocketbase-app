import { Router } from "next/router"
import { createContext, useContext, useEffect, useState } from "react"
import LoginPage from "../../pages/login"
import { usePocketBase } from "../hooks/usePocketbase"

interface AuthProps {
    token?: string | null
    onLogin?: (email: string, password: string) => Promise<any>
    onLogout?: () => Promise<any>
    isLoading?: boolean
}

const AuthContext = createContext<AuthProps>({})

export const AuthProvider = ({ children }: any) => {
    const { client } = usePocketBase();
    const [token, setToken] = useState(null)
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        const loadToken = async () => {
            setLoading(false)
        }
    }, []);

    const handleLogin = async (email: string, password: string) => {
        try {
            const authData = await client.collection("users").authWithPassword(email, password);
            console.log("AuthProvider.tsx:28 handleLogin authData:", authData)
        } catch (e) {
            console.log(e)
            return { error: true, message: (e as any).response.data.msg } 
        }
    }

    const handleLogout = async () => {
        setToken(null)
        client.authStore.clear
    }

    const value = {
        token,
        onLogin: handleLogin,
        onLogout: handleLogout,
        isLoading,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}

export const useAuth = () => {
    return useContext(AuthContext)
}

export const PrivateRoute = ({ children} : any) => {
    const { token, isLoading } = useAuth()

    if (isLoading || token == undefined) {
        return
    }
    return token ? children : <LoginPage />
}