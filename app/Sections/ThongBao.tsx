'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Section from '../components/Section'
import { IPost } from '../types'
import parse from 'html-react-parser'
import { parserOptions } from '../Constants'

function ThongBao() {
    const [data, setData] = useState<IPost[]>([])

    useEffect(() => {
        fetch('/api/thong-bao', {
            cache: 'no-cache'
        })
            .then(res => res.json())
            .then(value => setData(value))
    }, [])
    return (
        <Section title='» THÔNG TIN MỚI' className='bg-turquoise'>
            <ul>
                {data.map((item: IPost) => (
                    <li
                        key={item.id}
                        className='border-b cursor-pointer hover:underline'
                    >
                        {item.link ? (
                            <a
                                href={item.link}
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                {parse(item.title, parserOptions)}
                            </a>
                        ) : (
                            <Link href={`/thong-bao/${item.id}`}>
                                {parse(item.title, parserOptions)}
                            </Link>
                        )}
                    </li>
                ))}
            </ul>
        </Section>
    )
}

export default ThongBao
