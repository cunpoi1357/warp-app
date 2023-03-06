'use client'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import React, { useEffect, useState } from 'react'
import ReactQuill from 'react-quill'
import { IPost } from '~/app/types'

function Page({ params }: { params: Params }) {
    const [data, setData] = useState<IPost>()
    useEffect(() => {
        fetch(`/api/thong-bao/${params.id}`, {
            method: 'GET',
            cache: 'reload'
        })
            .then(res => res.json())
            .then(value => setData(value))
    }, [])

    return (
        <section className='mb-32 text-gray-800'>
            <h1 className='mb-4 text-3xl font-bold'>{data?.title}</h1>
            <ReactQuill value={data?.content} readOnly theme='bubble' />
        </section>
    )
}

export default Page
