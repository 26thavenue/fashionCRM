'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/app/context/AuthContext'
import { AlertCircle } from 'lucide-react'

const LoginPage = () => {
  const router = useRouter()
  const { login } = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    if (!username.trim() || !password.trim()) {
      setError('Username and password are required')
      setIsLoading(false)
      return
    }

    const success = login(username, password)
    setIsLoading(false)

    if (success) {
      router.push('/dashboard')
    } else {
      setError('Login failed. Please try again.')
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

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-card p-8 border border-zinc-100">
          <h2 className="text-2xl font-semibold text-zinc-900 mb-6">Sign In</h2>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
              <AlertCircle size={20} className="text-red-600 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-zinc-700 mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full cursor-pointer py-2 px-4 bg-zinc-600 hover:bg-zinc-700 disabled:bg-purple-400 text-white font-medium rounded-lg transition-colors duration-200 mt-6"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

        
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-zinc-600 mt-6">
          © 2026 Thalia CRM. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default LoginPage
