'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import { validateEmail } from '@/lib/utils'
import { signIn } from '@/lib/auth/auth'

const LoginPage = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validate email
      const emailValidation = validateEmail(email)
      if (!emailValidation.isValid) {
        toast.error(emailValidation.error || 'Invalid email')
        setIsLoading(false)
        return
      }

      // Validate password
      if (!password.trim()) {
        toast.error('Password is required')
        setIsLoading(false)
        return
      }

      // Call signin
      const response = await signIn(email, password)
      
      toast.success('Login successful! Redirecting...')
      setTimeout(() => {
        router.push('/dashboard')
      }, 1000)
    } catch (error: any) {
      const errorMessage = error?.message || 'Login failed. Please check your credentials.'
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-10 sm:w-12 h-10 sm:h-12 bg-purple-600 rounded-lg text-white flex items-center justify-center font-bold text-lg sm:text-xl mx-auto mb-3 sm:mb-4">
            T
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-900 mb-2">Thalia CRM</h1>
          <p className="text-sm sm:text-base text-zinc-600">Fashion Management System</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-card p-6 sm:p-8 border border-zinc-100">
          <h2 className="text-xl sm:text-2xl font-semibold text-zinc-900 mb-6">Sign In</h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-sm"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all pr-10 text-sm"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-zinc-600 hover:text-zinc-900"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full cursor-pointer py-2 px-4 bg-zinc-600 hover:bg-zinc-700 disabled:bg-purple-400 text-white font-medium rounded-lg transition-colors duration-200 mt-6 text-sm"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-zinc-200"></div>
            <span className="text-xs text-zinc-500">Don't have an account?</span>
            <div className="flex-1 h-px bg-zinc-200"></div>
          </div>

          {/* Signup Link */}
          <Link
            href="/auth/signup"
            className="w-full block text-center py-2 px-4 border border-zinc-300 text-zinc-700 font-medium rounded-lg hover:bg-zinc-50 transition-colors duration-200 text-sm"
          >
            Create Account
          </Link>
        </div>

        {/* Footer */}
        <p className="text-center text-xs sm:text-sm text-zinc-600 mt-6">
          © 2026 Thalia CRM. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default LoginPage
