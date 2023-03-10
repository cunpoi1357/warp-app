'use client'
import {
    onAuthStateChanged,
    signInWithEmailAndPassword,
    setPersistence
} from 'firebase/auth'
import Link from 'next/link'
import React, { MouseEventHandler, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Notify } from 'notiflix/build/notiflix-notify-aio'

import Input from '~/app/components/Input'
import { auth } from '~/app/libs/firebase'

function LoginPage() {
    const { control, handleSubmit } = useForm()
    const router = useRouter()

    onAuthStateChanged(auth, data => {
        if (data) {
            router.push('/admin')
        }
    })

    const onSubmit = handleSubmit(data => {
        signInWithEmailAndPassword(auth, data.email, data.password)
            .then(() => {
                router.push('/admin')
                Notify.success('Đăng nhập thành công!')
            })
            .catch(error => Notify.warning(error.message))
    })

    return (
        <div className='flex flex-col items-center justify-center h-screen py-12 sm:px-6 lg:px-8'>
            <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                <h2 className='mt-6 text-3xl font-bold text-center text-gray-900'>
                    Đăng nhập tài khoản quản trị
                </h2>
                <p className='mt-2 text-sm text-center text-gray-600'>
                    hoặc{' '}
                    <Link
                        href='/register'
                        className='font-medium text-indigo-600 hover:text-indigo-500'
                    >
                        tạo một tài khoản
                    </Link>
                </p>
            </div>

            <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-sm'>
                <div className='px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10'>
                    <form className='space-y-6' onSubmit={onSubmit}>
                        <Input
                            id='email'
                            name='email'
                            label=' Email'
                            rules={{
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Email không hợp lệ'
                                }
                            }}
                            isRequired='Vui lòng nhập email'
                            control={control}
                        />
                        <Input
                            id='password'
                            name='password'
                            type='password'
                            label=' Mật khẩu'
                            isRequired='Vui lòng nhập mật khẩu'
                            control={control}
                        />

                        <div className='flex items-center justify-between'>
                            <div className='flex items-center'>
                                {/* <input
                                    id='remember-me'
                                    name='remember-me'
                                    type='checkbox'
                                    className='w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500'
                                />
                                <label
                                    htmlFor='remember-me'
                                    className='block ml-2 text-sm text-gray-900'
                                >
                                    Ghi nhớ
                                </label> */}
                            </div>

                            <div className='text-sm'>
                                <a
                                    href='#'
                                    className='font-medium text-indigo-600 hover:text-indigo-500'
                                >
                                    Quên mật khẩu?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type='submit'
                                className='flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                            >
                                Đăng nhập
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
