import React from 'react'

export default function LoginRight() {
  return (

        <div className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="w-full max-w-md p-4 bg-white rounded shadow-lg">
            <h2 className="text-2xl text-center font-bold mb-4">Login</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                />
              </div>
              <button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                type="submit"
              >
                Login
              </button>
            </form>
          </div>
        </div>
  )
}
