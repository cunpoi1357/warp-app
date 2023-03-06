'use client'
import { Dialog } from '@headlessui/react'
import React, { useState } from 'react'

import Modal from '~/app/components/Modal'
import Quill from '~/app/components/Quill'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { IPB } from '~/app/types'
import QuillWithControl from '~/app/components/QuillWithControl'
import Input from '~/app/components/Input'
import { useForm } from 'react-hook-form'

interface Props {
    data: IPB
    onUpdate: (data: IPB) => void
}

function EditPBModal({ data, onUpdate }: Props) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const { handleSubmit, control, reset } = useForm({
        defaultValues: data
    })

    const handleOpenModal = () => setIsModalOpen(true)
    const handleCloseModal = () => setIsModalOpen(false)

    const onSubmit = handleSubmit(data => {
        onUpdate(data as IPB)
        reset()
        handleCloseModal()
    })

    return (
        <>
            <button
                className='flex items-center justify-center p-2 text-orange-400 transition-colors border border-orange-400 rounded-full cursor-pointer hover:bg-orange-400 hover:text-white'
                onClick={handleOpenModal}
            >
                <PencilSquareIcon className='h-6' />
            </button>
            <Modal isOpen={isModalOpen} setIsOpen={setIsModalOpen}>
                <Dialog.Panel className='w-full max-w-3xl p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
                    <Dialog.Title
                        as='h3'
                        className='text-lg font-medium leading-6 text-gray-900'
                    >
                        Thêm bản PB
                    </Dialog.Title>
                    <form onSubmit={onSubmit}>
                        <div className='flex flex-col gap-4 mt-2'>
                            <Input
                                control={control}
                                name='name'
                                label='Tên'
                                rules={{
                                    required: 'Vui lòng nhập tên'
                                }}
                            />
                            <QuillWithControl
                                className='mb-16 h-28'
                                control={control}
                                name='description'
                                label='Mô tả'
                            />
                            <Input
                                control={control}
                                name='path'
                                label='Đường dẫn'
                                rules={{
                                    required: 'Vui lòng nhập đường dẫn'
                                }}
                            />
                        </div>

                        <div className='px-4 py-3 mt-16 sm:flex sm:flex-row-reverse sm:px-6'>
                            <button
                                type='submit'
                                className='inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'
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
                    </form>
                </Dialog.Panel>
            </Modal>
        </>
    )
}

export default EditPBModal
