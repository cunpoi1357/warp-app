'use client'
import { FacebookAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { auth } from '../libs/firebase'
import { Notify } from 'notiflix/build/notiflix-notify-aio'
import AuthContext from '../Context/AuthContext'

const facebookProvider = new FacebookAuthProvider()

function LoginWithFacebook() {
    const user = useContext(AuthContext)

    const handleLogin = () => {
        signInWithPopup(auth, facebookProvider)
            .then(() => {
                Notify.success('Đăng nhập thành công')
            })
            .catch(error =>
                Notify.failure('Đăng nhấp thất bại: ', error?.message)
            )
    }

    const handleLogout = () => {
        signOut(auth).then(() => Notify.success('Đăng xuất thành công'))
    }
    return (
        <>
            {user?.uid ? (
                <div className='flex'>
                    <p>Chào mừng {user?.displayName}</p>,{'  '}
                    <button className='hover:underline' onClick={handleLogout}>
                        đăng xuất
                    </button>
                </div>
            ) : (
                <button className='hover:underline' onClick={handleLogin}>
                    Đăng nhập với facebook
                </button>
            )}
        </>
    )
}

export default LoginWithFacebook
