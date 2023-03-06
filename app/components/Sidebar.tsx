'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import UserDropdown from './UserDropdown'
import clsx from 'clsx'

interface IMenuItem {
    icon: string
    name: string
    path: string
}

export default function Sidebar() {
    const [collapseShow, setCollapseShow] = useState('hidden')
    const pathname = usePathname()

    const MenuList: IMenuItem[] = [
        {
            icon: 'fa-solid fa-bullhorn',
            name: 'Thông báo đầu tiên',
            path: '/admin/thong-bao-dau'
        },
        {
            icon: 'fa-solid fa-bullhorn',
            name: 'Thông báo',
            path: '/admin/thong-bao'
        },
        {
            icon: 'fa-solid fa-puzzle-piece',
            name: 'Pb',
            path: '/admin/pb'
        },
        {
            icon: 'fa-solid fa-coins',
            name: 'Bán xu',
            path: '/admin/ban-xu'
        },
        {
            icon: 'fa-solid fa-ticket',
            name: 'Bán vé',
            path: '/admin/ban-ve'
        },
        {
            icon: 'fa-solid fa-store',
            name: 'Bán mod ninja',
            path: '/admin/ban-mod-ninja'
        },
        {
            icon: 'fa-solid fa-folder-tree',
            name: 'Thứ tự',
            path: '/admin/thu-tu'
        }
    ]

    return (
        <>
            <nav className='relative z-10 flex flex-wrap items-center justify-between px-6 py-4 bg-white shadow-xl md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden md:w-64'>
                <div className='flex flex-wrap items-center justify-between w-full px-0 mx-auto md:flex-col md:items-stretch md:min-h-full md:flex-nowrap'>
                    {/* Toggler */}
                    <button
                        className='px-3 py-1 text-xl leading-none text-black bg-transparent border border-transparent border-solid rounded opacity-50 cursor-pointer md:hidden'
                        type='button'
                        onClick={() =>
                            setCollapseShow('bg-white m-2 py-3 px-6')
                        }
                    >
                        <i className='fas fa-bars'></i>
                    </button>
                    {/* Brand */}
                    <Link
                        href='/'
                        className='inline-block p-4 px-0 mr-0 text-sm font-bold text-left uppercase md:block md:pb-2 text-slate-600 whitespace-nowrap'
                    >
                        Warp app
                    </Link>
                    {/* User */}
                    <ul className='flex flex-wrap items-center list-none md:hidden'>
                        <li className='relative inline-block'>
                            <UserDropdown />
                        </li>
                    </ul>
                    {/* Collapse */}
                    <div
                        className={
                            'md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ' +
                            collapseShow
                        }
                    >
                        {/* Collapse header */}
                        <div className='block pb-4 mb-4 border-b border-solid md:min-w-full md:hidden border-slate-200'>
                            <div className='flex flex-wrap'>
                                <div className='w-6/12'>
                                    <Link
                                        href='/'
                                        className='inline-block p-4 px-0 mr-0 text-sm font-bold text-left uppercase md:block md:pb-2 text-slate-600 whitespace-nowrap'
                                    >
                                        Warp app
                                    </Link>
                                </div>
                                <div className='flex justify-end w-6/12'>
                                    <button
                                        type='button'
                                        className='px-3 py-1 text-xl leading-none text-black bg-transparent border border-transparent border-solid rounded opacity-50 cursor-pointer md:hidden'
                                        onClick={() =>
                                            setCollapseShow('hidden')
                                        }
                                    >
                                        <i className='fas fa-times'></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Form */}
                        <form className='mt-6 mb-4 md:hidden'>
                            <div className='pt-0 mb-3'>
                                <input
                                    type='text'
                                    placeholder='Search'
                                    className='w-full h-12 px-3 py-2 text-base font-normal leading-snug bg-white border border-solid rounded shadow-none outline-none border-slate-500 placeholder-slate-300 text-slate-600 focus:outline-none'
                                />
                            </div>
                        </form>

                        {/* Divider */}
                        <hr className='my-4 md:min-w-full' />
                        {/* Heading */}
                        <h6 className='block pt-1 pb-4 text-xs font-bold no-underline uppercase md:min-w-full text-slate-500'>
                            Quản lí website
                        </h6>
                        {/* Navigation */}

                        <ul className='flex flex-col list-none md:flex-col md:min-w-full'>
                            {MenuList.map(MenuItem => (
                                <li
                                    key={MenuItem.path}
                                    className='items-center'
                                >
                                    <Link
                                        href={MenuItem.path}
                                        className={clsx(
                                            'text-xs uppercase py-3 font-bold block',
                                            pathname === MenuItem.path
                                                ? 'text-sky-500 hover:text-sky-600'
                                                : 'text-slate-700 hover:text-slate-500'
                                        )}
                                    >
                                        <i
                                            className={clsx(
                                                MenuItem.icon,
                                                'mr-3 text-sm',
                                                pathname === MenuItem.path
                                                    ? 'opacity-75'
                                                    : 'text-slate-300'
                                            )}
                                        />
                                        {MenuItem.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
