import React from 'react'

export default function Button({
    children,
    type = "button",
    ...props
}) {
    return (
        <button
            type={type}
            {...props}
            className={`
                inline-flex items-center justify-center
                rounded-md px-4 py-2
                text-sm font-medium
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                disabled:opacity-50 disabled:cursor-not-allowed
                bg-blue-600 text-white hover:bg-blue-700
            `}
        >
            {children}
        </button>
    )
}
