'use client'
import { TrashIcon } from '@heroicons/react/24/outline'
import React, { useContext, useEffect, useState } from 'react'
import { Notify } from 'notiflix/build/notiflix-notify-aio'
import { Confirm } from 'notiflix/build/notiflix-confirm-aio'

import AuthContext from '~/app/Context/AuthContext'
import { IPB } from '~/app/types'
import CreateNewPBModal from '../components/CreateNewPBModal'
import EditPBModal from '../components/EditPBModal'
import Link from 'next/link'

function Page() {
    const [data, setData] = useState<IPB[]>([])
    const { tokenId } = useContext(AuthContext)

    useEffect(() => {
        fetch('/api/pb')
            .then(res => res.json())
            .then(value => setData(value))
    }, [])

    const handleCreate = (data: IPB) => {
        fetch('/api/pb', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + tokenId
            },
            body: JSON.stringify(data)
        }).then(() => {
            Notify.success('Tạo PB thành công')
            fetch('/api/pb')
                .then(res => res.json())
                .then(value => setData(value))
        })
    }
    const handleDelete = (id: number) => {
        Confirm.show(
            'Xóa PB',
            'Bạn có chắc chắn là muốn xóa bản PB này?',
            'Đồng ý',
            'Hủy',
            () => {
                fetch('/api/pb', {
                    method: 'DELETE',
                    headers: {
                        Authorization: 'Bearer ' + tokenId
                    },
                    body: JSON.stringify({ id })
                }).then(() => {
                    Notify.success('Xóa PB thành công')
                    fetch('/api/pb')
                        .then(res => res.json())
                        .then(value => setData(value))
                })
            }
        )
    }

    const handleUpdate = (data: IPB) => {
        fetch('/api/pb', {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + tokenId
            },
            body: JSON.stringify(data)
        })
            .then(() => {
                Notify.success('Chỉnh sửa PB thành công')
                fetch('/api/pb', {
                    method: 'GET'
                })
                    .then(res => res.json())
                    .then(posts => setData(posts))
            })
            .catch(() => Notify.failure('Chỉnh sửa PB thất bại'))
    }

    return (
        <div className='flex flex-col gap-10'>
            <div className='flex justify-between'>
                <h3 className='text-2xl text-gray-54'>Quản lý PB</h3>
                <CreateNewPBModal onCreate={handleCreate} />
            </div>
            <div>
                <div className='relative overflow-x-auto'>
                    <table className='w-full text-sm text-left text-gray-500 table-auto'>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                            <tr>
                                <th scope='col' className='px-6 py-3'>
                                    Tên
                                </th>
                                <th scope='col' className='w-full px-6 py-3'>
                                    Mô tải
                                </th>
                                <th scope='col' className='px-6 py-3'>
                                    Tệp tin
                                </th>
                                <th scope='col' className='px-6 py-3'>
                                    Hành động
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => (
                                <tr key={item.id} className='bg-white border-b'>
                                    <td className='px-6 py-4'>{item.name}</td>
                                    <td className='px-6 py-4'>
                                        {item.description}
                                    </td>
                                    <td className='px-6 py-4'>
                                        <Link
                                            href={`/${item.path}`}
                                            className='text-turquoise hover:underline'
                                            target='_blank'
                                            rel='noopener noreferrer'
                                        >
                                            {item.path}
                                        </Link>
                                    </td>
                                    <td className='px-6 py-4'>
                                        <div className='flex gap-4'>
                                            <EditPBModal
                                                data={item}
                                                onUpdate={handleUpdate}
                                            />
                                            <button
                                                className='flex items-center justify-center p-2 text-red-400 transition-colors border border-red-400 rounded-full cursor-pointer hover:bg-red-400 hover:text-white'
                                                onClick={() =>
                                                    handleDelete(item.id)
                                                }
                                            >
                                                <TrashIcon className='h-6' />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Page
