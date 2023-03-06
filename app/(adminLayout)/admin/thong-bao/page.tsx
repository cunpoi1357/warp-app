'use client'
import dynamic from 'next/dynamic'
import { useState, useEffect, useContext } from 'react'
import { TrashIcon } from '@heroicons/react/24/outline'
import { IPost } from '~/app/types'
import { Notify } from 'notiflix/build/notiflix-notify-aio'
import { Confirm } from 'notiflix/build/notiflix-confirm-aio'

import CreateNewPostModal from '../components/CreateNewPostModal'
import EditPostModal from '../components/EditPostModal'
import AuthContext from '~/app/Context/AuthContext'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

function ThongBao() {
    const [data, setData] = useState<IPost[]>([])
    const { tokenId } = useContext(AuthContext)

    useEffect(() => {
        fetch(`/api/thong-bao`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(posts => setData(posts))
    }, [])

    const handleDeletePost = (id: string) => {
        Confirm.show(
            'Xóa thông báo',
            'Bạn có chắc chắn là muốn xóa thông báo này?',
            'Đồng ý',
            'Hủy',
            () => {
                fetch('/api/thong-bao', {
                    method: 'DELETE',
                    headers: {
                        Authorization: 'Bearer ' + tokenId
                    },
                    body: JSON.stringify({ id })
                })
                    .then(() => Notify.success('Xóa thông báo thành công'))
                    .catch(() => Notify.failure('Xóa thông báo thất bại'))
                fetch(`/api/thong-bao`, {
                    method: 'GET'
                })
                    .then(res => res.json())
                    .then(posts => setData(posts))
            }
        )
    }

    const handleUpdate = (data: IPost) => {
        fetch('/api/thong-bao', {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + tokenId
            },
            body: JSON.stringify(data)
        })
            .then(() => {
                Notify.success('Chỉnh sửa thông báo thành công')
                fetch(`/api/thong-bao`, {
                    method: 'GET'
                })
                    .then(res => res.json())
                    .then(posts => setData(posts))
            })
            .catch(() => Notify.failure('Chỉnh sửa thông báo thất bại'))
    }

    const handleCreate = (title: string, content: string) => {
        fetch('/api/thong-bao', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + tokenId
            },
            body: JSON.stringify({
                title,
                content
            })
        })
            .then(() => {
                Notify.success('Tạo thông báo mới thành công')
                fetch(`/api/thong-bao`, {
                    method: 'GET'
                })
                    .then(res => res.json())
                    .then(posts => setData(posts))
            })
            .catch(() => Notify.failure('Tạo thông báo mới thất bại'))
    }

    return (
        <div className='flex flex-col gap-10'>
            <div className='flex justify-between'>
                <h3 className='text-2xl text-gray-54'>Quản lý thông báo</h3>
                <CreateNewPostModal onCreate={handleCreate} />
            </div>
            <div>
                <div className='relative overflow-x-auto'>
                    <table className='w-full text-sm text-left text-gray-500 table-auto'>
                        <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
                            <tr>
                                <th scope='col' className='px-6 py-3'>
                                    Tên
                                </th>
                                <th scope='col' className='px-6 py-3'>
                                    Nội dung
                                </th>
                                <th scope='col' className='px-6 py-3'>
                                    Hành động
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item: IPost) => (
                                <tr key={item.id} className='bg-white border-b'>
                                    <th
                                        scope='row'
                                        className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'
                                    >
                                        {item.title}
                                    </th>
                                    <td className='px-6 py-4'>
                                        <ReactQuill
                                            value={item.content}
                                            readOnly={true}
                                            theme={'bubble'}
                                        />
                                    </td>
                                    <td className='px-6 py-4'>
                                        <div className='flex gap-4'>
                                            <EditPostModal
                                                data={item}
                                                onUpdate={handleUpdate}
                                            />
                                            <button
                                                className='flex items-center justify-center p-2 text-red-400 transition-colors border border-red-400 rounded-full cursor-pointer hover:bg-red-400 hover:text-white'
                                                onClick={() =>
                                                    handleDeletePost(
                                                        String(item.id)
                                                    )
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

export default ThongBao
