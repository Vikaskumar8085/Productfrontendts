import React, { useState, useEffect } from 'react';

const Dashboard: React.FC = () => {
    const [darkMode, setDarkMode] = useState(false);

    // Load theme from localStorage and apply to root element
    useEffect(() => {
        const isDark = localStorage.getItem('theme') === 'dark';
        setDarkMode(isDark);
        document.documentElement.classList.toggle('dark', isDark);
    }, []);

    // Toggle theme and save preference to localStorage
    const toggleDarkMode = () => {
        const isDark = !darkMode;
        setDarkMode(isDark);
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        document.documentElement.classList.toggle('dark', isDark);
    };

    return (
        <button
            onClick={toggleDarkMode}
            className="p-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded"
        >
            {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
    );
};

export default Dashboard;
