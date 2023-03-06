'use client'
import { useState } from 'react'
import {
    useFloating,
    autoUpdate,
    offset,
    flip,
    shift,
    useDismiss,
    useRole,
    useClick,
    useInteractions,
    FloatingFocusManager,
    useId
} from '@floating-ui/react'
import { signOut } from 'firebase/auth'
import { auth } from '../libs/firebase'
import { Notify } from 'notiflix/build/notiflix-notify-aio'
import { useRouter } from 'next/navigation'

const UserDropdown = () => {
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const { x, y, refs, strategy, context } = useFloating({
        open,
        onOpenChange: setOpen,
        middleware: [
            offset(({ rects }) => ({
                mainAxis: 10,
                crossAxis: -rects.floating.width / 2 + 24
            })),
            flip({ fallbackAxisSideDirection: 'end' }),
            shift()
        ],
        whileElementsMounted: autoUpdate
    })

    const click = useClick(context)
    const dismiss = useDismiss(context)
    const role = useRole(context)

    const { getReferenceProps, getFloatingProps } = useInteractions([
        click,
        dismiss,
        role
    ])

    const headingId = useId()

    const handleSignOut = () =>
        signOut(auth).then(() => {
            Notify.info('Đăng xuất thành công')
            router.push('/login')
        })

    return (
        <>
            <button ref={refs.setReference} {...getReferenceProps()}>
                <div className='flex items-center'>
                    <span className='inline-flex items-center justify-center w-12 h-12 text-sm text-white rounded-full bg-slate-200'>
                        {/* <Image
                            alt='a'
                            className='w-full align-middle border-none rounded-full shadow-lg'
                        /> */}
                    </span>
                </div>
            </button>
            {open && (
                <FloatingFocusManager context={context} modal={false}>
                    <div
                        className='bg-white Popover w-28'
                        ref={refs.setFloating}
                        style={{
                            position: strategy,
                            top: y ?? 0,
                            left: x ?? 0
                        }}
                        aria-labelledby={headingId}
                        {...getFloatingProps()}
                    >
                        <a
                            href='#pablo'
                            className={
                                'text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700'
                            }
                            onClick={e => e.preventDefault()}
                        >
                            Tài khoản
                        </a>

                        <div className='h-0 my-2 border border-solid border-slate-100' />
                        <button
                            className={
                                'text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700'
                            }
                            onClick={handleSignOut}
                        >
                            Đăng xuất
                        </button>
                    </div>
                </FloatingFocusManager>
            )}
        </>
    )
}

export default UserDropdown
