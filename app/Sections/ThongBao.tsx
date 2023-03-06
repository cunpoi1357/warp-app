import Link from 'next/link'
import React from 'react'
import Section from '../components/Section'
import { IPost } from '../types'

const fetchData = async () => {
    const res = await fetch(`${process.env.BASE_FETCH_URL}/api/thong-bao`, {
        method: 'GET',
        cache: 'reload'
    })

    return await res.json()
}

async function ThongBao() {
    const data = await fetchData()
    return (
        <Section title='» THÔNG TIN MỚI' className='bg-turquoise'>
            <ul>
                {data.map((item: IPost) => (
                    <li
                        key={item.id}
                        className='border-b cursor-pointer hover:underline'
                    >
                        <Link
                            href={`${process.env.BASE_FETCH_URL}/thong-bao/${item.id}`}
                        >
                            {item.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </Section>
    )
}

export default ThongBao
