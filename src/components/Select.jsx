import React, { useId } from 'react'

function Select(
    {
        options,
        label,
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

            <select
                {...props}
                id={id}
                ref={ref}
                className="
                    w-full rounded-md border border-gray-300
                    bg-white px-3 py-2 text-sm
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    disabled:bg-gray-100 disabled:cursor-not-allowed
                "
            >
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select)
