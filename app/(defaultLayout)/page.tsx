'use client'
import React, { useEffect, useState } from 'react'
import BanHotMoiCapNhat from '../Sections/BanHotMoiCapNhat'
import BanTool from '../Sections/BanTool'
import KhuVucBanNickNinjaSchool from '../Sections/KhuVucBanNickNinjaSchool'
import KhuVucBanVeLuongTuDong from '../Sections/KhuVucBanVeLuongTuDong'
import KhuVucBanXuTuDong from '../Sections/KhuVucBanXuTuDong'
import KhuVucGiaLap from '../Sections/KhuVucGiaLap'
import KhuVucModPB from '../Sections/KhuVucModPB'
import ThongBao from '../Sections/ThongBao'
import ThongBaoDau from '../Sections/ThongBaoDau'
import Top from '../Sections/Top'
import { ISection } from '../types'

function HomePage() {
    const [data, setData] = useState<ISection[]>([])

    useEffect(() => {
        fetch('/api/thu-tu', {
            cache: 'no-cache'
        })
            .then(res => res.json())
            .then(value => setData(value))
    }, [])

    const Sections = data.map(section => {
        if (section.hidden) {
            return null
        }
        switch (section.id) {
            case 'tbd':
                return <ThongBaoDau key={section.id} />
            case 'tb':
                return <ThongBao key={section.id} />
            case 'kvbxtd':
                return <KhuVucBanXuTuDong key={section.id} />
            case 'kvbvltd':
                return <KhuVucBanVeLuongTuDong key={section.id} />
            case 'kvbnns':
                return <KhuVucBanNickNinjaSchool key={section.id} />
            case 'bhmcn':
                return <BanHotMoiCapNhat key={section.id} />
            case 'kvpbmns':
                return <KhuVucModPB key={section.id} />
            case 'kvtgl':
                return <KhuVucGiaLap key={section.id} />
            case 'btmpbntyc':
                return <BanTool key={section.id} />
            case 'top':
                return <Top key={section.id} />
            default:
                break
        }
    })

    return <>{Sections}</>
}

export default HomePage
