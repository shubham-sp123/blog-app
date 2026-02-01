import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { login } from '../store/authSlice'
import { Input, Logo, Button } from './index'

function Signup() {
    const [error, setError] = useState('')
    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const create = async (data) => {
        try {
            const session = await authService.createAccount(data)
            if (session) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(login(userData))
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
                        Sign up to create an account
                    </h2>
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link
                            to="/login"
                            className="font-medium text-blue-600 hover:underline"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>

                {error && (
                    <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit(create)} className="space-y-4">
                    <Input
                        label="Full Name"
                        placeholder="Enter your full name"
                        {...register('name', {
                            required: true,
                        })}
                    />

                    <Input
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
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
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
                        {...register('password', {
                            required: true,
                        })}
                    />

                    <Button type="submit" className="w-full">
                        Create Account
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default Signup
