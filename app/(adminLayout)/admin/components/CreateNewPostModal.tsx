'use client'
import { Dialog } from '@headlessui/react'
import React, { useState } from 'react'

import Button from '~/app/components/Button'
import Modal from '~/app/components/Modal'
import Quill from '~/app/components/Quill'

interface Props {
    onCreate: (title: string, content: string) => void
}

function CreateNewPostModal({ onCreate }: Props) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState<string>('')

    const handleOpenModal = () => setIsModalOpen(true)
    const handleCloseModal = () => setIsModalOpen(false)

    const handleCreateNewPost = () => {
        onCreate(title, content)
        setTitle('')
        setContent('')
        handleCloseModal()
    }

    return (
        <>
            <Button
                className='transition-colors border border-slate-700 hover:bg-slate-700 hover:text-white'
                onClick={handleOpenModal}
            >
                Thêm thông báo
            </Button>
            <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
                <Dialog.Panel className='w-full max-w-3xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
                    <Dialog.Title
                        as='h3'
                        className='text-lg font-medium leading-6 text-gray-900'
                    >
                        Tạo thông báo
                    </Dialog.Title>
                    <div className='mt-2'>
                        <label htmlFor='name'>Tiêu đề</label>
                        <input
                            type='text'
                            id='name'
                            className='block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                        <label htmlFor='content'>Nội dung</label>
                        <Quill
                            value={content}
                            onChange={setContent}
                            className='h-56'
                        />
                    </div>

                    <div className='px-4 py-3 mt-16 sm:flex sm:flex-row-reverse sm:px-6'>
                        <button
                            type='button'
                            className='inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'
                            onClick={handleCreateNewPost}
                        >
                            Tạo
                        </button>
                        <button
                            type='button'
                            className='inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                            onClick={handleCloseModal}
                        >
                            Hủy
                        </button>
                    </div>
                </Dialog.Panel>
            </Modal>
        </>
    )
}

export default CreateNewPostModal
