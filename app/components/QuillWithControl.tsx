import React, { useId } from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form'
import ReactQuill from 'react-quill'

interface Props {
    className?: string
    name: string
    control: Control<any, any>
    label: string
    rules?: { [key: string]: object }
    [prop: string]: any
}

function QuillWithControl({ control, name, label, className, rules }: Props) {
    const id = useId()

    const toolbar = [
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

    return (
        <div>
            <label
                htmlFor={id}
                className='block text-sm font-medium text-gray-700'
            >
                {label}
            </label>
            <div className='mt-1'>
                <Controller
                    name={name}
                    control={control}
                    rules={rules}
                    render={({ field, fieldState }) => (
                        <>
                            <ReactQuill
                                {...field}
                                className={className}
                                theme='snow'
                                modules={{ toolbar }}
                                placeholder={'Write Description'}
                                onChange={text => {
                                    field.onChange(text)
                                }}
                            />
                            {fieldState.error && (
                                <p className='mt-1 -mb-4 text-red-400'>
                                    {fieldState.error?.message}
                                </p>
                            )}
                        </>
                    )}
                />
            </div>
        </div>
    )
}

export default QuillWithControl
