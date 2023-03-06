import Link from 'next/link'
import React from 'react'
import Section from '../components/Section'
import { IPB } from '../types'

const fetchData = async () => {
    const res = await fetch(`${process.env.BASE_FETCH_URL}/api/pb`, {
        method: 'GET',
        cache: 'reload'
    })

    return await res.json()
}

async function KhuVucModPB() {
    const data = await fetchData()
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
