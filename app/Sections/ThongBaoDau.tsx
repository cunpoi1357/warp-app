'use client'
import React, { useEffect, useState } from 'react'
import parse from 'html-react-parser'
import { parserOptions } from '../Constants'

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
            {parse(data, parserOptions)}
        </div>
    )
}

export default ThongBaoDau
