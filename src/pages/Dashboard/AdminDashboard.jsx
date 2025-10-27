import React from 'react';

const AdminDashboard = () => {
    const stats = [
        { label: 'Total Pets', value: '156', icon: '🐾', color: 'blue', change: '+12%' },
        { label: 'Active Users', value: '1,234', icon: '👥', color: 'green', change: '+8%' },
        { label: 'Adoptions This Month', value: '89', icon: '🏠', color: 'purple', change: '+15%' },
        { label: 'Pending Requests', value: '23', icon: '📋', color: 'orange', change: '-3%' }
    ];

    const recentActivities = [
        { id: 1, action: 'New pet "Max" added', user: 'Shelter Manager', time: '1 hour ago', type: 'add' },
        { id: 2, action: 'Adoption request approved', user: 'Admin', time: '2 hours ago', type: 'approve' },
        { id: 3, action: 'User profile updated', user: 'John Doe', time: '3 hours ago', type: 'update' },
        { id: 4, action: 'New shelter registered', user: 'Happy Paws Shelter', time: '1 day ago', type: 'register' }
    ];

    const pendingRequests = [
        { id: 1, pet: 'Buddy', user: 'Sarah Johnson', date: '2024-01-15', status: 'pending' },
        { id: 2, pet: 'Luna', user: 'Mike Chen', date: '2024-01-14', status: 'pending' },
        { id: 3, pet: 'Charlie', user: 'Emily Davis', date: '2024-01-13', status: 'pending' }
    ];

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Admin Dashboard 👑
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                    Manage your pet adoption platform and monitor system activity.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className={`p-3 rounded-lg bg-${stat.color}-100 dark:bg-${stat.color}-900`}>
                                    <span className="text-2xl">{stat.icon}</span>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                        {stat.label}
                                    </p>
                                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {stat.value}
                                    </p>
                                </div>
                            </div>
                            <div className={`text-sm font-medium ${
                                stat.change.startsWith('+') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                            }`}>
                                {stat.change}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activities */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Recent Activities
                        </h2>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {recentActivities.map((activity) => (
                                <div key={activity.id} className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                                            <span className="text-sm text-gray-600 dark:text-gray-300">
                                                {activity.type === 'add' ? '➕' : 
                                                 activity.type === 'approve' ? '✅' : 
                                                 activity.type === 'update' ? '✏️' : '🏢'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                            {activity.action}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            by {activity.user} • {activity.time}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Pending Requests */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Pending Adoption Requests
                        </h2>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {pendingRequests.map((request) => (
                                <div key={request.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                                            <span className="text-lg">🐾</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                {request.pet}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {request.user}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="px-2 py-1 text-xs font-medium bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full">
                                            {request.status}
                                        </span>
                                        <button className="px-3 py-1 text-xs font-medium bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded">
                                            Review
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Quick Actions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <button className="p-4 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                        <div className="text-2xl mb-2">🐕</div>
                        <h3 className="font-medium text-gray-900 dark:text-white">Add New Pet</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Register a new pet</p>
                    </button>
                    <button className="p-4 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                        <div className="text-2xl mb-2">👥</div>
                        <h3 className="font-medium text-gray-900 dark:text-white">Manage Users</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">View and edit users</p>
                    </button>
                    <button className="p-4 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                        <div className="text-2xl mb-2">📊</div>
                        <h3 className="font-medium text-gray-900 dark:text-white">View Analytics</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Check platform stats</p>
                    </button>
                    <button className="p-4 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                        <div className="text-2xl mb-2">⚙️</div>
                        <h3 className="font-medium text-gray-900 dark:text-white">Settings</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Configure platform</p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;