import { TfiAlignLeft, TfiAlignRight } from 'react-icons/tfi';
import { FaBell, FaPowerOff } from 'react-icons/fa';
import React from 'react'
import { useNavigate } from 'react-router-dom';

interface headerprops {
    setcollable: any
    collable: unknown
}

const Header = ({ collable, setcollable }: headerprops) => {
    const navigate = useNavigate();
    const handleLogout = () => {
        if (localStorage.getItem('token')) {
            localStorage.removeItem('token')
            navigate('/login')
        }
    }
    return (
        <>
            <header className="bg-white-800 sticky t-0 text-white p-4 rounded-md flex items-center justify-between shadow-lg">
                {/* Toggle Button */}
                <button
                    className="p-2 bg-gray-600 rounded-md hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    {collable ? (
                        <TfiAlignLeft className="text-2xl" onClick={() => setcollable(!collable)} />
                    ) : (
                        <TfiAlignRight className="text-2xl" onClick={() => setcollable(!collable)} />
                    )}
                </button>

                {/* User Info Section */}
                <div className="flex items-center space-x-4">
                    {/* Notification Icon */}
                    {/* <button
                        className="relative p-2 bg-gray-600 rounded-md hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                        <FaBell className="text-xl" /> */}
                    {/* Notification Badge */}
                    {/* <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                            3
                        </span>
                    </button> */}

                    {/* User Image */}
                    {/* <div className="relative">
                        <img
                            src="https://via.placeholder.com/40" // Replace with dynamic user image URL
                            alt="User"
                            className="w-10 h-10 rounded-full border-2 border-white"
                        />
                    </div> */}

                    {/* Logout Button */}
                    <button
                        className="p-2 bg-gray-600 rounded-md hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        onClick={handleLogout} // Replace with actual logout functionality
                    >
                        <FaPowerOff className="text-xl" />
                    </button>
                </div>
            </header>
        </>
    )
}

export default Header
