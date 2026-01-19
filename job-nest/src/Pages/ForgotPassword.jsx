import React from 'react'
import { Mail, ArrowLeft } from "lucide-react";

export default function ForgotPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="bg-blue-600 text-white p-3 rounded-lg">
            JN
          </div>
          <h2 className="text-xl font-semibold text-gray-800">JobNest</h2>
        </div>

        {/* Heading */}
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
          Forgot your password?
        </h1>
        <p className="text-center text-gray-500 mb-6 text-sm">
          No worries! Enter your email and we&apos;ll send you a reset link.
        </p>

        {/* Email Field */}
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <div className="relative mb-6">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Button */}
        <button className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-2.5 rounded-lg font-medium hover:opacity-90 transition">
          Send Reset Link
        </button>

        {/* Back to Sign In */}
        <div className="flex items-center justify-center gap-2 mt-6 text-gray-500 hover:text-blue-600 cursor-pointer text-sm">
          <ArrowLeft size={16} />
          <span>Back to sign in</span>
        </div>
      </div>
    </div>
  );
}
