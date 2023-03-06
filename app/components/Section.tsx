import React from 'react'
import clsx from 'clsx'

interface SectionProps {
    className?: string
    children?: React.ReactNode
    title: React.ReactNode
    titleCenter?: boolean
}

function Section({ className, children, title, titleCenter }: SectionProps) {
    return (
        <section className='overflow-hidden border rounded border-light-gray-dd'>
            <h3
                className={clsx(
                    'py-1 px-2 font-bold bg-white-f5 -blue-600 border-b-2',
                    {
                        'text-center': titleCenter
                    },
                    className
                )}
            >
                {title}
            </h3>
            <div className='p-2 bg-white'>{children}</div>
        </section>
    )
}

export default Section
