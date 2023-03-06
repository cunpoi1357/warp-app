'use client'
import dynamic from 'next/dynamic'
import React from 'react'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

interface IQuillProps {
    className?: string
    value?: string
    onChange?: (value: string) => void
    readOnly?: boolean
    [prop: string]: any
}

function Quill({
    className,
    value,
    onChange,
    readOnly,
    ...props
}: IQuillProps) {
    const toolbar = !readOnly
        ? [
              [{ font: [] }], // custom dropdown
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              ['bold', 'italic', 'underline', 'strike'], // toggled buttons
              [{ color: [] }, { background: [] }], // dropdown with defaults from theme
              [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
              [{ header: 1 }, { header: 2 }], // custom button values
              ['blockquote', 'code-block'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ indent: '-1' }, { indent: '+1' }], // outdent/indent

              [{ direction: 'rtl' }], // text direction

              [{ align: [] }],

              ['clean'], // remove formatting button,
              ['link', 'image', 'video']
          ]
        : undefined
    return (
        <ReactQuill
            className={className}
            modules={{
                toolbar: toolbar
            }}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            {...props}
        />
    )
}

export default Quill
