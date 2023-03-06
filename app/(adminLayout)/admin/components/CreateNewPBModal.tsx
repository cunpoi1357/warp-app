'use client'
import { Dialog } from '@headlessui/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import Button from '~/app/components/Button'
import Input from '~/app/components/Input'
import Modal from '~/app/components/Modal'
import QuillWithControl from '~/app/components/QuillWithControl'
import { IPB } from '~/app/types'

interface Props {
    onCreate: (data: IPB) => void
}

function CreateNewPBModal({ onCreate }: Props) {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

    const { handleSubmit, control, reset } = useForm()

    const handleOpenModal = () => setIsModalOpen(true)
    const handleCloseModal = () => setIsModalOpen(false)

    const onSubmit = handleSubmit(data => {
        onCreate(data as IPB)
        reset()
        handleCloseModal()
    })

    return (
        <>
            <Button
                className='transition-colors border border-slate-700 hover:bg-slate-700 hover:text-white'
                onClick={handleOpenModal}
            >
                Thêm bản PB
            </Button>
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
                            <label htmlFor='file'>Chọn tệp tin</label>
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

export default CreateNewPBModal
