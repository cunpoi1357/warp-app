'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Section from '../components/Section'
import { IPB } from '../types'

function KhuVucModPB() {
    const [data, setData] = useState<IPB[]>([])

    useEffect(() => {
        fetch('/api/pb', {
            cache: 'no-cache'
        })
            .then(res => res.json())
            .then(value => setData(value))
    }, [])
    return (
        <Section title='» Khu vực PB mod ninja school' className='bg-dark-teal'>
            {' '}
            <ul>
                {data.map((item: IPB) => (
                    <li
                        key={item.id}
                        className='border-b cursor-pointer hover:underline'
                    >
                        <Link
                            href={`${process.env.BASE_FETCH_URL}/pb/${item.id}`}
                        >
                            {item.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </Section>
    )
}

export default KhuVucModPB
