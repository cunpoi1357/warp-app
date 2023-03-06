'use client'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { useContext, useEffect, useState } from 'react'
import Button from '~/app/components/Button'
import AuthContext from '~/app/Context/AuthContext'
import { Notify } from 'notiflix/build/notiflix-notify-aio'
import { ISection } from '~/app/types'

function move(array: any[], moveIndex: number, toIndex: number) {
    let item = array[moveIndex]
    let length = array.length
    let diff = moveIndex - toIndex

    if (diff > 0) {
        return [
            ...array.slice(0, toIndex),
            item,
            ...array.slice(toIndex, moveIndex),
            ...array.slice(moveIndex + 1, length)
        ]
    } else if (diff < 0) {
        return [
            ...array.slice(0, moveIndex),
            ...array.slice(moveIndex + 1, toIndex + 1),
            item,
            ...array.slice(toIndex + 1, length)
        ]
    }
    return array
}
function QLThuTu() {
    const [data, setData] = useState<ISection[]>([])
    const { tokenId } = useContext(AuthContext)
    useEffect(() => {
        fetch('/api/thu-tu', {
            cache: 'no-store'
        })
            .then(res => res.json())
            .then(data => setData(data))
    }, [])

    const handleMoveDown = (index: number) => {
        let newArr
        if (index === data.length - 1) {
            newArr = move(data, index, 1)
        } else {
            newArr = move(data, index, index + 1)
        }
        setData(newArr)
    }

    const handleMoveUp = (index: number) => {
        let newArr
        if (index === 0) {
            newArr = move(data, index, data.length)
        } else {
            newArr = move(data, index, index - 1)
        }
        setData(newArr)
    }

    const handleUpdate = () => {
        fetch('/api/thu-tu', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + tokenId
            },
            body: JSON.stringify({ data })
        })
            .then(data => {
                Notify.success('Cập nhật thành công')
            })
            .catch(error => {
                console.error('Error:', error)
            })
    }

    const handleToggle = (id: string) => {
        setData(prevState => {
            const newState = [...prevState]
            newState[prevState.findIndex(item => item.id === id)].hidden =
                !newState[prevState.findIndex(item => item.id === id)].hidden
            return newState
        })
    }

    return (
        <div className='flex flex-col flex-wrap'>
            <h3 className='text-lg font-semibold text-slate-700'>
                Thứ tự các phần
            </h3>
            <ul>
                {data.map((item, index) => (
                    <li
                        key={item.id}
                        className='flex justify-between p-6 mb-1 bg-gray-800 border-gray-700 rounded-lg shadow'
                    >
                        <p className='text-white'>{item.name}</p>
                        <div className='flex text-white'>
                            <button onClick={() => handleToggle(item.id)}>
                                {item.hidden ? (
                                    <EyeSlashIcon className='w-6 h-6 rounded-md cursor-pointer hover:bg-gray-700' />
                                ) : (
                                    <EyeIcon className='w-6 h-6 rounded-md cursor-pointer hover:bg-gray-700' />
                                )}
                            </button>
                            <button onClick={() => handleMoveUp(index)}>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth={1.5}
                                    stroke='currentColor'
                                    className='w-6 h-6 rounded-md cursor-pointer hover:bg-gray-700'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75'
                                    />
                                </svg>
                            </button>
                            <button onClick={() => handleMoveDown(index)}>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    fill='none'
                                    viewBox='0 0 24 24'
                                    strokeWidth={1.5}
                                    stroke='currentColor'
                                    className='w-6 h-6 rounded-md cursor-pointer hover:bg-gray-700'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        d='M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75'
                                    />
                                </svg>{' '}
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <div
                className='p-4 mt-4 rounded-b-lg bg-white-f8'
                onClick={handleUpdate}
            >
                <Button className='text-green-400 transition-colors border border-green-400 hover:bg-green-400 hover:text-white'>
                    Lưu thay đổi
                </Button>
            </div>
        </div>
    )
}

export default QLThuTu
