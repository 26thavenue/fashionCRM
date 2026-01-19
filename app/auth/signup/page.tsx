'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AlertCircle, Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import { validateEmail, validatePassword, validatePasswordMatch } from '@/lib/utils'
import { signUp } from '@/lib/auth/auth'

const SignupPage = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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
      const passwordValidation = validatePassword(password)
      if (!passwordValidation.isValid) {
        toast.error(passwordValidation.error || 'Invalid password')
        setIsLoading(false)
        return
      }

      // Validate password match
      const matchValidation = validatePasswordMatch(password, confirmPassword)
      if (!matchValidation.isValid) {
        toast.error(matchValidation.error || 'Passwords do not match')
        setIsLoading(false)
        return
      }

      // Call signup
      const response = await signUp(email, password)
      
      toast.success('Signup successful! Redirecting to login...')
      setTimeout(() => {
        router.push('/auth/login')
      }, 1500)
    } catch (error: any) {
      const errorMessage = error?.message || 'Signup failed. Please try again.'
      toast.error(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-purple-600 rounded-lg text-white flex items-center justify-center font-bold text-xl mx-auto mb-4">
            T
          </div>
          <h1 className="text-3xl font-bold text-zinc-900 mb-2">Thalia CRM</h1>
          <p className="text-zinc-600">Fashion Management System</p>
        </div>

        {/* Signup Card */}
        <div className="bg-white rounded-2xl shadow-card p-8 border border-zinc-100">
          <h2 className="text-2xl font-semibold text-zinc-900 mb-6">Create Account</h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
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
                className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                disabled={isLoading}
              />
              <p className="text-xs text-zinc-500 mt-1">We'll never share your email</p>
            </div>

            {/* Password */}
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
                  placeholder="Enter a strong password"
                  className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all pr-10"
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
              <p className="text-xs text-zinc-500 mt-1">
                Min 8 chars: uppercase, lowercase, number & special char
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-zinc-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all pr-10"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-2.5 text-zinc-600 hover:text-zinc-900"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full cursor-pointer py-2 px-4 bg-zinc-600 hover:bg-zinc-700 disabled:bg-purple-400 text-white font-medium rounded-lg transition-colors duration-200 mt-6"
            >
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-zinc-200"></div>
            <span className="text-xs text-zinc-500">Already have an account?</span>
            <div className="flex-1 h-px bg-zinc-200"></div>
          </div>

          {/* Login Link */}
          <Link
            href="/auth/login"
            className="w-full block text-center py-2 px-4 border border-zinc-300 text-zinc-700 font-medium rounded-lg hover:bg-zinc-50 transition-colors duration-200"
          >
            Sign In Instead
          </Link>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-zinc-600 mt-6">
          © 2026 Thalia CRM. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default SignupPage
