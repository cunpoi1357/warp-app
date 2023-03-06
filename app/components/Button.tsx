import clsx from 'clsx'
import React from 'react'

interface IButtonProps {
    leftIcon?: React.ReactNode
    rightIcon?: React.ReactNode
    className?: string
    onClick?: React.MouseEventHandler<HTMLElement>
    children: React.ReactNode
}

function Button({
    leftIcon,
    rightIcon,
    className,
    children,
    onClick,
    ...props
}: IButtonProps) {
    return (
        <button
            className={clsx(
                'flex items-center gap-2 rounded-lg py-2 px-4 transition-colors hover:opacity-90',
                className
            )}
            onClick={onClick}
            {...props}
        >
            {leftIcon}
            <span className='flex-1 truncate'>{children}</span>
            {rightIcon}
        </button>
    )
}

export default Button
