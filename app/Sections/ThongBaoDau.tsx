'use client'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

function ThongBaoDau() {
    const [data, setData] = useState('')
    useEffect(() => {
        fetch(`/api/thong-bao-dau`, {
            method: 'GET',
            cache: 'reload'
        })
            .then(res => res.json())
            .then(value => setData(value))
    }, [])
    return (
        <div className='p-4 border rounded bg-rose-100 border-rose-300'>
            <ReactQuill
                value={data}
                className='-mb-14'
                readOnly
                theme='bubble'
            />
        </div>
    )
}

export default ThongBaoDau
