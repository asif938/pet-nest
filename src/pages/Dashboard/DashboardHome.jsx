import React from 'react';
import AdminDashboard from './AdminDashboard';
import UserDashboard from './UserDashboard';
import useUserRole from '../../hooks/useUserRole';

const DashboardHome = () => {
    // I will get the role from the database
    // const role = 'admin';
    const { role, roleLoading } = useUserRole();

    if (role === 'admin') {
        return <AdminDashboard></AdminDashboard>;
    } 
    else if (role === 'user') {
        return <UserDashboard></UserDashboard>;
    }
    else {
        return <div className="text-center py-12">
            <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-600 text-red-700 dark:text-red-300 px-4 py-3 rounded max-w-md mx-auto">
                <strong className="font-bold">Access Denied!</strong>
                <span className="block sm:inline"> You are not authorized to access this page.</span>
            </div>
        </div>;
    }
};

export default DashboardHome;
