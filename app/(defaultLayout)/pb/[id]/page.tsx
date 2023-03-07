'use client'
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher'
import React, { useEffect, useState } from 'react'
import parse from 'html-react-parser'
import { IPB } from '~/app/types'

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
            <h1 className='mb-4 text-3xl font-bold'>
                {data?.name && parse(data?.name)}
            </h1>
            {data?.description && parse(data?.description)}

            <p>
                Tải về:
                <a
                    href={`/${data?.path}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='hover:underline text-turquoise'
                >
                    {data?.path}
                </a>
            </p>
        </section>
    )
}

export default Page
