'use client'

import { useEffect } from 'react'
import { auth } from '~/app/libs/firebase'
import { Notify } from 'notiflix/build/notiflix-notify-aio'
import { useRouter } from 'next/navigation'

export default function AdminLayout({
    children
}: {
    children: React.ReactNode
}) {
    const router = useRouter()
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (!user) {
                router.push('/login')
                Notify.warning('Vui lòng đăng nhập tài khoản')
            } else {
                auth.currentUser?.getIdTokenResult().then(idTokenResult => {
                    if (!idTokenResult.claims.admin) {
                        router.push('/login')
                        Notify.warning('Vui lòng đăng nhập tài khoản quản trị')
                        auth.signOut()
                    }
                })
            }
        })
    }, [])
    return children
}
