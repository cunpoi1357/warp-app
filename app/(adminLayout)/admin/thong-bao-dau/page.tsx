'use client'
import React, { useContext, useEffect, useState } from 'react'
import Button from '~/app/components/Button'
import Quill from '~/app/components/Quill'
import { Notify } from 'notiflix/build/notiflix-notify-aio'
import AuthContext from '~/app/Context/AuthContext'

function ThongBaoDau() {
    const [data, setData] = useState<string>('')
    const { tokenId } = useContext(AuthContext)
    useEffect(() => {
        fetch(`/api/thong-bao-dau`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(value => setData(value))
    }, [])

    const handleUpdate = () => {
        fetch(`/api/thong-bao-dau`, {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + tokenId
            },
            body: JSON.stringify({ value: data })
        }).then(() => Notify.success('Cập nhật thông báo thành công'))
    }

    return (
        <div className='flex flex-col gap-10'>
            <div className='flex justify-between'>
                <h3 className='text-2xl text-gray-54'>
                    Quản lý thông báo đầu tiên
                </h3>
            </div>
            <Quill className='h-80' value={data} onChange={setData} />
            <div className='p-4 mt-4 rounded-b-lg bg-white-f8'>
                <Button
                    className='text-green-400 transition-colors border border-green-400 hover:bg-green-400 hover:text-white'
                    onClick={handleUpdate}
                >
                    Lưu thay đổi
                </Button>
            </div>
        </div>
    )
}

export default ThongBaoDau
