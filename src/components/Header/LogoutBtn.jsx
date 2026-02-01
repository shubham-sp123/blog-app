import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()

    const logooutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }

    return (
        <button
            onClick={logooutHandler}
            className="
                rounded-md px-3 py-2 text-sm font-medium
                text-red-600
                transition-colors
                hover:bg-red-50 hover:text-red-700
            "
        >
            Logout
        </button>
    )
}

export default LogoutBtn
