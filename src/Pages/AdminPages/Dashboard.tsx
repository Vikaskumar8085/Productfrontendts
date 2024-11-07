import React, { useState, useEffect } from 'react';
import Layout from '../../component/Layout/Layout';
import Breadcrumb from '../../Common/BreadCrumb/BreadCrumb';
import Card from '../../Common/Card/Card';
import ReactQuill from 'react-quill';

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
        <>

            <Layout>
                <div className="flex flex-row w-full  justify-center px-3 gap-10 relative block overflow-hidden">
                    <ReactQuill className='w-full h-20' />


                </div>
            </Layout>
        </>
    );
};

export default Dashboard;


// <button
// onClick={toggleDarkMode}
// className="p-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded"
// >
// {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
// </button>