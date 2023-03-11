'use client'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import React, { useEffect, useState } from 'react'
import parse from 'html-react-parser'
import { IPost } from '~/app/types'
import { parserOptions } from '~/app/Constants'

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
            <h1 className='mb-4 text-3xl font-bold'>
                {data?.title && parse(data?.title, parserOptions)}
            </h1>
            {data?.content && parse(data?.content, parserOptions)}
        </section>
    )
}

export default Page
