import React from 'react';

const UserDashboard = () => {
    const stats = [
        { label: 'My Pets', value: '3', icon: '🐾', color: 'blue' },
        { label: 'Adoptions', value: '1', icon: '🏠', color: 'green' },
        { label: 'Messages', value: '5', icon: '💬', color: 'purple' },
        { label: 'Favorites', value: '12', icon: '❤️', color: 'red' }
    ];

    const recentActivities = [
        { id: 1, action: 'Adopted Buddy', time: '2 hours ago', type: 'adoption' },
        { id: 2, action: 'Received message from shelter', time: '1 day ago', type: 'message' },
        { id: 3, action: 'Added Luna to favorites', time: '2 days ago', type: 'favorite' },
        { id: 4, action: 'Updated profile information', time: '3 days ago', type: 'profile' }
    ];

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    Welcome back, John! 👋
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                    Here's what's happening with your pet adoption journey.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
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
                    </div>
                ))}
            </div>

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
                                            {activity.type === 'adoption' ? '🏠' : 
                                             activity.type === 'message' ? '💬' : 
                                             activity.type === 'favorite' ? '❤️' : '👤'}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                        {activity.action}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {activity.time}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Quick Actions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button className="p-4 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                        <div className="text-2xl mb-2">🔍</div>
                        <h3 className="font-medium text-gray-900 dark:text-white">Browse Pets</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Find your perfect companion</p>
                    </button>
                    <button className="p-4 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                        <div className="text-2xl mb-2">📝</div>
                        <h3 className="font-medium text-gray-900 dark:text-white">Update Profile</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Keep your information current</p>
                    </button>
                    <button className="p-4 text-left border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                        <div className="text-2xl mb-2">💬</div>
                        <h3 className="font-medium text-gray-900 dark:text-white">View Messages</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Check your conversations</p>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;