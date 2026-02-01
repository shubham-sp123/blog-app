import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Container, Logo, LogoutBtn } from '../index'

function Header() {
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()
    const location = useLocation() // get current path

    const navItems = [
        { name: 'Home', slug: '/', active: true },
        { name: 'Login', slug: '/login', active: !authStatus },
        { name: 'Signup', slug: '/signup', active: !authStatus },
        { name: 'All Posts', slug: '/all-posts', active: authStatus },
        { name: 'Add Post', slug: '/add-post', active: authStatus },
    ]

    return (
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
            <Container>
                <nav className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2">
                            <Logo />
                        </Link>
                    </div>

                    <ul className="flex items-center gap-2 sm:gap-4">
                        {navItems.map(
                            (item) =>
                                item.active && (
                                    <li key={item.name}>
                                        <button
                                            onClick={() => navigate(item.slug)}
                                            className={`
                                                rounded-md px-3 py-2 text-sm font-medium
                                                transition-colors
                                                ${location.pathname === item.slug
                                                    ? 'bg-gray-900 text-white' // active page styling
                                                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                                }
                                            `}
                                        >
                                            {item.name}
                                        </button>
                                    </li>
                                )
                        )}

                        {authStatus && (
                            <li className="ml-2">
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}

export default Header
