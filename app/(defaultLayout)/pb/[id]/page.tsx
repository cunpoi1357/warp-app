'use client'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import { IPB } from '~/app/types'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

function Page({ params }: { params: Params }) {
    const [data, setData] = useState<IPB>()
    useEffect(() => {
        fetch(`/api/pb/${params.id}`, {
            method: 'GET',
            cache: 'reload'
        })
            .then(res => res.json())
            .then(value => setData(value))
    }, [])

    return (
        <section className='mb-32 text-gray-800'>
            <h1 className='mb-4 text-3xl font-bold'>{data?.name}</h1>
            <ReactQuill value={data?.description} readOnly theme='bubble' />
        </section>
    )
}

export default Page
