'use client'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { Notify } from 'notiflix/build/notiflix-notify-aio'

import Input from '~/app/components/Input'
import { auth } from '~/app/libs/firebase'
import { useRouter } from 'next/navigation'

function Page() {
    const { handleSubmit, control, getValues } = useForm()
    const router = useRouter()
    const onSubmit = handleSubmit(data =>
        createUserWithEmailAndPassword(auth, data.email, data.password)
            .then(() => {
                Notify.success('Đăng kí thành công')
                router.push('/login')
            })
            .catch(error => Notify.warning(error.message))
    )
    return (
        <div className='flex flex-col items-center justify-center h-screen py-12 sm:px-6 lg:px-8'>
            <div className='sm:mx-auto sm:w-full sm:max-w-md'>
                <h2 className='mt-6 text-3xl font-bold text-center text-gray-900'>
                    Đăng kí tài khoản
                </h2>
            </div>

            <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-sm'>
                <div className='px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10'>
                    <form className='space-y-6' onSubmit={onSubmit}>
                        <Input
                            control={control}
                            name='email'
                            label='Email'
                            rules={{
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Email không hợp lệ.'
                                },
                                required: 'Vui lòng nhập email.'
                            }}
                        />

                        <Input
                            control={control}
                            name='password'
                            type='password'
                            label='Mật khẩu'
                            rules={{
                                pattern: {
                                    value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/i,
                                    message: 'Mật khẩu quá đơn giản.'
                                },
                                required: 'Vui lòng nhập mật khẩu.'
                            }}
                        />
                        <Input
                            control={control}
                            name='retype_password'
                            type='password'
                            label='Nhập lại mật khẩu'
                            rules={{
                                validate: (value: string) =>
                                    value === getValues('password') ||
                                    'Mật khẩu không khớp',
                                required: 'Vui lòng nhập lại mật khẩu.'
                            }}
                        />

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
                                className='flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
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

export default Page
