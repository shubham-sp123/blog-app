import React, { useId } from 'react'

const Input = React.forwardRef(function Input(
    {
        label,
        type = 'text',
        ...props
    },
    ref
) {
    const id = useId()

    return (
        <div className="flex flex-col gap-1 w-full">
            {label && (
                <label
                    htmlFor={id}
                    className="text-sm font-medium text-gray-700"
                >
                    {label}
                </label>
            )}

            <input
                type={type}
                id={id}
                ref={ref}
                {...props}
                className="
                    w-full rounded-md border border-gray-300
                    px-3 py-2 text-sm
                    placeholder-gray-400
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    disabled:bg-gray-100 disabled:cursor-not-allowed
                "
            />
        </div>
    )
})

export default Input
