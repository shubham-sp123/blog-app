import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import { login as authLogin } from '../store/authSlice'
import { Input, Button, Logo } from './index'

function Login() {
    const [error, setError] = useState('')
    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const login = async (data) => {
        setError('')
        try {
            const session = await authService.login(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(authLogin(userData))
                navigate('/')
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                
                <div className="mb-6 flex flex-col items-center gap-3">
                    <span className="flex justify-center">
                        <Logo />
                    </span>
                    <h2 className="text-xl font-semibold text-gray-900">
                        Sign in to your account
                    </h2>
                    <p className="text-sm text-gray-600">
                        Don&apos;t have an account?{' '}
                        <Link
                            to="/signup"
                            className="font-medium text-blue-600 hover:underline"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>

                {error && (
                    <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit(login)} className="space-y-4">
                    <Input
                        label="Email"
                        placeholder="Enter your email"
                        type="email"
                        {...register('email', {
                            required: true,
                            validate: {
                                matchPatern: (value) =>
                                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    'Email address must be a valid address',
                            },
                        })}
                    />

                   <Input
                label="Password: "
                type="password"
                autoComplete='off'
                placeholder="Enter your password"
                {...register("password", {
                    required: true,
                })}
                />
                    <Button type="submit" className="w-full">
                        Sign in
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default Login
