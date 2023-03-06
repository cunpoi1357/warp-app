import Link from 'next/link'
import React from 'react'

function page() {
    return (
        <div className='h-screen flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8'>
            <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                <h2 className='mt-6 text-center text-3xl font-bold text-gray-900'>
                    Đăng kí tài khoản
                </h2>
            </div>

            <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-sm'>
                <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
                    <form className='space-y-6' action='#' method='POST'>
                        <div>
                            <label
                                htmlFor='email'
                                className='block text-sm font-medium text-gray-700'
                            >
                                Email
                            </label>
                            <div className='mt-1'>
                                <input
                                    id='email'
                                    name='email'
                                    type='email'
                                    autoComplete='email'
                                    required
                                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor='password'
                                className='block text-sm font-medium text-gray-700'
                            >
                                Mật khẩu
                            </label>
                            <div className='mt-1'>
                                <input
                                    id='password'
                                    name='password'
                                    type='password'
                                    autoComplete='current-password'
                                    required
                                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor='retype_password'
                                className='block text-sm font-medium text-gray-700'
                            >
                                Nhập lại mật khẩu
                            </label>
                            <div className='mt-1'>
                                <input
                                    id='retype_password'
                                    name='retype_password'
                                    type='retype_password'
                                    autoComplete='current-password'
                                    required
                                    className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                                />
                            </div>
                        </div>

                        <div className='flex items-center justify-between'>
                            <div className='text-sm'>
                                Đẵ có tài khoản?{' '}
                                <Link
                                    href='/login'
                                    className='font-medium text-indigo-600 hover:text-indigo-500'
                                >
                                    Đăng nhập ngay
                                </Link>
                            </div>
                        </div>

                        <div>
                            <button
                                type='submit'
                                className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                            >
                                Đăng kí
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default page
