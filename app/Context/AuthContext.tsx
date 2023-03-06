'use client'
import React, { createContext, useEffect, useState } from 'react'
import { auth } from '../libs/firebase'
import { Notify } from 'notiflix/build/notiflix-notify-aio'

const AuthContext = createContext<{
    tokenId: string
    [x: string]: any
}>({
    tokenId: ''
})

function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>(null)
    const [tokenId, setTokenId] = useState<any>(null)

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(data => {
            setUser(data)
            auth.currentUser?.getIdToken().then(data => setTokenId(data))
        })
        return unsubscribe
    }, [])

    const value = {
        ...user,
        tokenId
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export { AuthProvider }
export default AuthContext
