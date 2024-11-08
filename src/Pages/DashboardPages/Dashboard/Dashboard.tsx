import React, { useState, useEffect } from 'react';
import Layout from '../../../component/Layout/Layout';

const Dashboard: React.FC = () => {
    return (
        <>

            <Layout>
                <div className="flex flex-row w-full  justify-center px-3 gap-10 relative block overflow-hidden">

                    dashboard
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