import React from 'react'
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

const fetchThuTu = async () => {
    const data = await fetch('http://localhost:3000/api/thu-tu', {
        cache: 'no-cache'
    })
    const thuTu: ISection[] = await data.json()
    const Sections = thuTu.map(section => {
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
    return Sections
}

async function HomePage() {
    const thuTu = await fetchThuTu()
    return <>{thuTu}</>
}

export default HomePage
