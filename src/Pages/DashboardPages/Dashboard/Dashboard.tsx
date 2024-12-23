import React, { useState, useEffect } from 'react';
import Layout from '../../../component/Layout/Layout';
import DashboardComp from "../../../component/Layout/dashboard";
const Dashboard: React.FC = () => {
    return (
        <>

            <Layout>
                
                    <DashboardComp />
               
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