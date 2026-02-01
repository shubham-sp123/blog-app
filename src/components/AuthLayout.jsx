import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function AuthLayout({ children, authentication = true }) {
    const authStatus = useSelector(state => state.auth.status)
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)

    useEffect(() => {
        if (authentication && authStatus !== authentication) {
            navigate('/login')
        } else if (!authentication && authStatus !== authentication) {
            navigate('/')
        }
        setLoader(false)
    }, [authentication, authStatus, loader])

    return loader ? (
        <div className="flex min-h-screen items-center justify-center">
            <h1 className="text-lg font-medium text-gray-600">
                Loading...
            </h1>
        </div>
    ) : (
        <>{children}</>
    )
}

export default AuthLayout
