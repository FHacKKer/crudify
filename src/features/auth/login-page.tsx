'use client'

import React, {useState} from 'react'

import {Link, useNavigate} from 'react-router-dom'
import {Eye, EyeOff, Loader2} from 'lucide-react'

import {Button} from '@/components/ui/button'
import {Input} from '@/components/ui/input'
import {Label} from '@/components/ui/label'
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card'
import api from "@/services/api.ts";
import {useAppContext} from "@/context/AppContex.tsx";

interface FormData {
    login: string
    password: string
}

type successResponse = {
    success: true;
    message: string;
    token : string;
    refreshToken:string
}

type errorResponse = {
    success: false;
    message: string;
}

type ServerResponse = successResponse | errorResponse

export default function LoginPage() {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState<FormData>({
        login: '',
        password: '',
    })
    const [errors, setErrors] = useState<Partial<FormData>>({})


    const {setAccessToken, setIsLoggedIn, isLoggedIn, accessToken} = useAppContext()

    if(isLoggedIn || accessToken){
        navigate("/");
        return
    }

    const validateForm = (): boolean => {
        const newErrors: Partial<FormData> = {}

        if(!formData.login) {
            newErrors.login = 'Email or Username is required'
        }

        if (!formData.password) {
            newErrors.password = 'Password is required'
        } else if (formData.password.length < 4) {
            newErrors.password = 'Password must be at least 4 characters'
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
            // Simulate API call
            const req = await api.post("/api/v1/auth/signin",
                {
                    login:formData.login,
                    password: formData.password,
                },
            );
            const res:ServerResponse = req.data
            if(res.success) {
                setAccessToken(res.token);
                setIsLoggedIn(true)
                localStorage.setItem("refreshToken", res.refreshToken);
                navigate("/");
                return
            }

        } catch (error) {
            console.error('Login failed:', error)
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
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
                    <CardDescription className="text-center">
                        Enter your email and password to sign in
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="login">Email or Username</Label>
                            <Input
                                id="login"
                                name="login"
                                type="text"
                                placeholder="name@example.com | username"
                                value={formData.login}
                                onChange={handleInputChange}
                                className={errors.login ? 'border-red-500' : ''}
                                disabled={isLoading}
                            />
                            {errors.login && (
                                <p className="text-sm text-red-500">{errors.login}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password">Password</Label>
                                <Link
                                    to="/forgot-password"
                                    className="text-sm text-primary hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>
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
                            {isLoading ? 'Signing in...' : 'Sign in'}
                        </Button>
                    </form>
                    <div className="flex items-center justify-between mt-2">
                        <p>Don't have an Account</p>
                        <Link to={"/register"} className={`underline`}>Sign up Now</Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

