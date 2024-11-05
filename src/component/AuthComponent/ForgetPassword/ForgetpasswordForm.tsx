import React from 'react'

const ForgetpasswordForm: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-yellow-900">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-1xl font-bold text-center text-gray-600">Forget Password</h2>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <button className="w-full px-4 py-2 font-bold text-white bg-blue-900 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">submit</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default ForgetpasswordForm
