import clsx from 'clsx'
import React, { useId } from 'react'
import { Control, FieldValues, useController } from 'react-hook-form'

interface Props {
    className?: string
    name: string
    control: Control<any, any>
    label: string
    onChange?: () => void
    rules?: { [key: string]: any }
    isRequired?: boolean | string
    [prop: string]: any
}

function Input({
    className,
    name,
    control,
    label,
    isRequired,
    onChange,
    rules,
    ...props
}: Props) {
    const { field, fieldState } = useController({
        name,
        control,
        rules: { required: isRequired, ...rules },
        defaultValue: ''
    })

    const id = useId()
    return (
        <div>
            <label
                htmlFor={id}
                className='block text-sm font-medium text-gray-700'
            >
                {label}
            </label>
            <div className='mt-1'>
                <input
                    id={id}
                    className={clsx(
                        'block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm',
                        {
                            'border-red-400': fieldState.error
                        }
                    )}
                    {...field}
                    {...props}
                />
            </div>
            {fieldState.error && (
                <p className='mt-1 -mb-4 text-red-400'>
                    {fieldState.error?.message}
                </p>
            )}
        </div>
    )
}

export default Input
