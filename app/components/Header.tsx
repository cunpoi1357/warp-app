import Link from 'next/link'
import React from 'react'
import LoginWithFacebook from './LoginWithFacebook'

function Header() {
    return (
        <header className='bg-white'>
            <div className='flex items-center justify-center h-10'>
                <h1 className='text-3xl text-white text-shadow'>
                    TrungDucTv.com
                </h1>
            </div>
            <nav>
                <ul className='flex justify-center p-1 bg-turquoise'>
                    <li className='pr-2 mr-2 text-sm font-bold text-white uppercase border-r hover:underline border-r-white'>
                        <Link href='/'> Trang chủ</Link>
                    </li>
                    <li className='pr-2 mr-2 text-sm font-bold text-white uppercase border-r border-r-white'>
                        Nạp thẻ mua xu
                    </li>
                    <li className='text-sm font-bold text-white uppercase'>
                        Rút xu
                    </li>
                </ul>
            </nav>
            <div className='flex items-center justify-center w-full p-2 font-bold text-white bg-gray-33'>
                <LoginWithFacebook />
            </div>
        </header>
    )
}

export default Header
