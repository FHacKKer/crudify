'use client'

import React, { useState } from 'react'
import { Eye, EyeOff, Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {Link, useNavigate} from "react-router-dom";
import api from "@/services/api.ts";
import {AxiosResponse} from "axios";

interface FormData {
    name: string
    username: string
    email: string
    password: string
}

interface ServerResponse {
    success: boolean
    message: string
}

type FormErrors = Partial<FormData>

export default function RegisterPage() {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [emailAliasWarning, setEmailAliasWarning] = useState(false)
    const [formData, setFormData] = useState<FormData>({
        name: '',
        username: '',
        email: '',
        password: '',
    })
    const [errors, setErrors] = useState<FormErrors>({})

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {}

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = 'Name is required'
        }

        // Username validation
        if (!formData.username) {
            newErrors.username = 'Username is required'
        } else if (formData.username.includes(' ')) {
            newErrors.username = 'Username cannot contain spaces'
        }

        // Email validation
        if (!formData.email) {
            newErrors.email = 'Email is required'
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(formData.email)) {
                newErrors.email = 'Email is invalid'
            }
            // Check for email alias (+ symbol)
            if (formData.email.includes('+')) {
                setEmailAliasWarning(true)
                newErrors.email = 'Email aliases using + are not allowed'
            } else {
                setEmailAliasWarning(false)
            }
        }

        // Password validation
        if (!formData.password) {
            newErrors.password = 'Password is required'
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        setIsLoading(true)

        try {
            const {data}:AxiosResponse<ServerResponse> = await api.post("/api/v1/auth/signup", {
                name: formData.name,
                username: formData.username,
                email: formData.email,
                password: formData.password
            });

            if(data.success) {
                navigate("/login");
                return
            }

            alert(data.message);

        } catch (error) {
            console.error('Registration failed:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        // Clear error when user starts typing
        if (errors[name as keyof FormData]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }))
        }
        // Clear email alias warning when email field changes
        if (name === 'email') {
            setEmailAliasWarning(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
                    <CardDescription className="text-center">
                        Enter your information to register
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={errors.name ? 'border-red-500' : ''}
                                disabled={isLoading}
                            />
                            {errors.name && (
                                <p className="text-sm text-red-500">{errors.name}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                placeholder="johndoe"
                                value={formData.username}
                                onChange={handleInputChange}
                                className={errors.username ? 'border-red-500' : ''}
                                disabled={isLoading}
                            />
                            {errors.username && (
                                <p className="text-sm text-red-500">{errors.username}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={handleInputChange}
                                className={errors.email ? 'border-red-500' : ''}
                                disabled={isLoading}
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500">{errors.email}</p>
                            )}
                            {emailAliasWarning && (
                                <Alert className="mt-2">
                                    <AlertDescription>
                                        Email aliases (using +) are not allowed. Please use your main email address.
                                    </AlertDescription>
                                </Alert>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className={errors.password ? 'border-red-500 pr-10' : 'pr-10'}
                                    disabled={isLoading}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() => setShowPassword(!showPassword)}
                                    disabled={isLoading}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4 text-gray-500" />
                                    ) : (
                                        <Eye className="h-4 w-4 text-gray-500" />
                                    )}
                                    <span className="sr-only">
                    {showPassword ? 'Hide password' : 'Show password'}
                  </span>
                                </Button>
                            </div>
                            {errors.password && (
                                <p className="text-sm text-red-500">{errors.password}</p>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            {isLoading ? 'Creating account...' : 'Create account'}
                        </Button>
                    </form>
                    <div className="flex items-center justify-between mt-2">
                        <p>Already have an account ?</p>
                        <Link className={`underline`}  to={"/login"}>Sign in Now</Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

