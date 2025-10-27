import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router';
import ThemeToggle from '../components/ThemeToggle';
import useUserRole from '../hooks/useUserRole';
import useAuth from '../hooks/useAuth';

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const { user } = useAuth();

    const navigation = [
        { name: 'Dashboard', href: '/dashboard', icon: '📊', current: location.pathname === '/dashboard' },
        { name: 'My Pets', href: '/dashboard/pets', icon: '🐾', current: location.pathname === '/dashboard/pets' },
        { name: 'Adoptions', href: '/dashboard/adoptions', icon: '🏠', current: location.pathname === '/dashboard/adoptions' },
        { name: 'Mannage Requests', href: '/dashboard/managerequests', icon: '💬', current: location.pathname === '/dashboard/messages' },
        { name: 'Profile', href: '/dashboard/profile', icon: '👤', current: location.pathname === '/dashboard/profile' },
        { name: 'Settings', href: '/dashboard/settings', icon: '⚙️', current: location.pathname === '/dashboard/settings' },
    ];

    const adminNavigation = [
        { name: 'Admin Dashboard', href: '/dashboard/admin', icon: '👑', current: location.pathname === '/dashboard/admin' },
        { name: 'Manage Pets', href: '/dashboard/admin/pets', icon: '🐕', current: location.pathname === '/dashboard/admin/pets' },
        { name: 'Manage Users', href: '/dashboard/makeadmin', icon: '👥', current: location.pathname === '/dashboard/admin/users' },
        { name: 'Adoption Requests', href: '/dashboard/admin/requests', icon: '📋', current: location.pathname === '/dashboard/admin/requests' },
        { name: 'Analytics', href: '/dashboard/admin/analytics', icon: '📈', current: location.pathname === '/dashboard/admin/analytics' },
    ];

    // const isAdmin = location.pathname.includes('/admin');
    const { role, roleLoading } = useUserRole();
    const isAdmin = role === 'admin'? true : false;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 lg:flex">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div 
                    className="fixed inset-0 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                >
                    <div className="absolute inset-0 bg-gray-600 bg-opacity-75"></div>
                </div>
            )}

            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
                <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 dark:border-gray-700">
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">🐾</span>
                        </div>
                        <span className="text-lg font-bold text-gray-800 dark:text-white">PetNest</span>
                    </Link>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <nav className="mt-6 px-3">
                    <div className="space-y-1">
                        {(isAdmin ? adminNavigation : navigation).map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                                    item.current
                                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                                }`}
                            >
                                <span className="mr-3 text-lg">{item.icon}</span>
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* User section */}
                    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center px-3">
                            {/* <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                                <span className="text-gray-600 dark:text-gray-300 font-medium">JD</span>
                                <img className='w-10 h-10 rounded-full flex justify-center items-center' src={user.photoURL} alt="" />
                            </div> */}
                            <img className='w-10 h-10 rounded-full flex justify-center items-center' src={user?.photoURL} alt="" />
                            <div className="ml-3">
                                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{user?.displayName}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                            </div>
                        </div>
                        <div className="mt-4 px-3">
                            <Link
                                to="/"
                                className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                            >
                                <span className="mr-3">🏠</span>
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col">
                {/* Top header */}
                <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                            <h1 className="ml-2 text-xl font-semibold text-gray-900 dark:text-white">
                                {isAdmin ? 'Admin Dashboard' : 'Dashboard'}
                            </h1>
                        </div>

                        <div className="flex items-center space-x-4">
                            {/* Notifications */}
                            <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 relative">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.828 7l2.586 2.586a2 2 0 002.828 0L12.828 7H4.828z" />
                                </svg>
                                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400"></span>
                            </button>

                            {/* Theme toggle */}
                            <ThemeToggle />

                            {/* User menu */}
                            <div className="relative">
                                <button className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                                    <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full flex items-center justify-center">
                                        <span className="text-gray-600 dark:text-gray-300 font-medium text-sm">JD</span>
                                    </div>
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="flex-1">
                    <div className="py-6">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;