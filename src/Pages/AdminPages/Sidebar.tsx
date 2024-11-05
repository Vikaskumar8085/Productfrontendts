// src/components/Sidebar.tsx
import React from 'react';

interface SidebarProps {
    isCollapsed: boolean;
    toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, toggleSidebar }) => {
    return (
        <aside className={`bg-gray-800 text-white transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'} h-full`}>
            <button onClick={toggleSidebar} className="p-2">
                {isCollapsed ? '>' : '<'}
            </button>
            <nav className="mt-4">
                <ul>
                    <li className="p-4 hover:bg-gray-700">Home</li>
                    <li className="p-4 hover:bg-gray-700">Settings</li>
                    <li className="p-4 hover:bg-gray-700">Profile</li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;