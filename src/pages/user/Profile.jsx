import React, { useState } from 'react';
import { FaUser, FaEdit, FaSave, FaTimes, FaPaw, FaHeart, FaHome, FaPhone, FaEnvelope, FaMapMarkerAlt, FaCamera } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
// import useAuth from '../hooks/useAuth';

const Profile = () => {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [activeTab, setActiveTab] = useState('profile');
    const [formData, setFormData] = useState({
        displayName: user?.displayName || '',
        email: user?.email || '',
        phone: '',
        address: '',
        bio: 'Animal lover with a passion for pet adoption. Looking to provide a loving home for a furry friend.',
        location: 'Not Set'
    });

    // Mock data for user stats and activities
    const userStats = [
        { label: 'Pets Adopted', value: 3, icon: FaPaw },
        { label: 'Favorites', value: 12, icon: FaHeart },
        { label: 'Active Applications', value: 2, icon: FaHome }
    ];

    const recentActivities = [
        { id: 1, type: 'adoption', message: 'Adoption request sent for Luna', date: '2 hours ago', pet: 'Luna' },
        { id: 2, type: 'favorite', message: 'Added Buddy to favorites', date: '1 day ago', pet: 'Buddy' },
        { id: 3, type: 'approved', message: 'Adoption approved for Whiskers', date: '3 days ago', pet: 'Whiskers' },
        { id: 4, type: 'application', message: 'Started new adoption application', date: '1 week ago', pet: 'Max' }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        // Here you would typically save to your backend
        console.log('Saving profile data:', formData);
        setIsEditing(false);
        // Add your API call here
    };

    const handleCancel = () => {
        setFormData({
            displayName: user?.displayName || '',
            email: user?.email || '',
            phone: '',
            address: '',
            bio: 'Animal lover with a passion for pet adoption. Looking to provide a loving home for a furry friend.',
            location: 'Not Set'
        });
        setIsEditing(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        My Profile
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300">
                        Manage your account and track your adoption journey
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                            {/* Profile Summary */}
                            <div className="text-center mb-6">
                                <div className="relative inline-block mb-4">
                                    <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                        {user?.photoURL ? (
                                            <img 
                                                src={user.photoURL} 
                                                alt="Profile" 
                                                className="w-full h-full rounded-full object-cover"
                                            />
                                        ) : (
                                            <FaUser />
                                        )}
                                    </div>
                                    <button className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition-colors">
                                        <FaCamera className="text-sm" />
                                    </button>
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                    {formData.displayName || 'User'}
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                    {formData.email}
                                </p>
                                <p className="text-gray-500 dark:text-gray-500 text-sm mt-1 flex items-center justify-center gap-1">
                                    <FaMapMarkerAlt className="text-red-500" />
                                    {formData.location}
                                </p>
                            </div>
                            <hr className='dark:text-gray-400' />

                            {/* Stats */}
                            {/* <div className="space-y-4 mb-6">
                                {userStats.map((stat, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                                                <stat.icon className="text-blue-600 dark:text-blue-400" />
                                            </div>
                                            <span className="text-gray-700 dark:text-gray-300 font-medium">
                                                {stat.label}
                                            </span>
                                        </div>
                                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                                            {stat.value}
                                        </span>
                                    </div>
                                ))}
                            </div> */}

                            {/* Navigation Tabs */}
                            <div className="space-y-2 mt-5">
                                <button
                                    onClick={() => setActiveTab('profile')}
                                    className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                                        activeTab === 'profile'
                                            ? 'bg-blue-500 text-white shadow-lg'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                                >
                                    Profile Information
                                </button>
                                <button
                                    onClick={() => setActiveTab('activity')}
                                    className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                                        activeTab === 'activity'
                                            ? 'bg-blue-500 text-white shadow-lg'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                                >
                                    Recent Activity
                                </button>
                                <button
                                    onClick={() => setActiveTab('settings')}
                                    className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                                        activeTab === 'settings'
                                            ? 'bg-blue-500 text-white shadow-lg'
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`}
                                >
                                    Account Settings
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {activeTab === 'profile' && (
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                                {/* Header */}
                                <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        Profile Information
                                    </h2>
                                    {!isEditing ? (
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                                        >
                                            <FaEdit /> Edit Profile
                                        </button>
                                    ) : (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={handleCancel}
                                                className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                                            >
                                                <FaTimes /> Cancel
                                            </button>
                                            <button
                                                onClick={handleSave}
                                                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                                            >
                                                <FaSave /> Save Changes
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Form */}
                                <div className="p-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Full Name
                                            </label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    name="displayName"
                                                    value={formData.displayName}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
                                                    placeholder="Enter your full name"
                                                />
                                            ) : (
                                                <p className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                                                    {formData.displayName || 'Not set'}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Email Address
                                            </label>
                                            {isEditing ? (
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
                                                    placeholder="Enter your email"
                                                />
                                            ) : (
                                                <p className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white flex items-center gap-2">
                                                    <FaEnvelope className="text-blue-500" />
                                                    {formData.email}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Phone Number
                                            </label>
                                            {isEditing ? (
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
                                                    placeholder="Enter your phone number"
                                                />
                                            ) : (
                                                <p className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white flex items-center gap-2">
                                                    <FaPhone className="text-green-500" />
                                                    {formData.phone || 'Not set'}
                                                </p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Location
                                            </label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    name="location"
                                                    value={formData.location}
                                                    onChange={handleInputChange}
                                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
                                                    placeholder="Enter your location"
                                                />
                                            ) : (
                                                <p className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white flex items-center gap-2">
                                                    <FaMapMarkerAlt className="text-red-500" />
                                                    {formData.location}
                                                </p>
                                            )}
                                        </div>

                                        <div className="md:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Bio
                                            </label>
                                            {isEditing ? (
                                                <textarea
                                                    name="bio"
                                                    value={formData.bio}
                                                    onChange={handleInputChange}
                                                    rows="4"
                                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-colors"
                                                    placeholder="Tell us about yourself and your experience with pets..."
                                                />
                                            ) : (
                                                <p className="px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white leading-relaxed">
                                                    {formData.bio}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'activity' && (
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        Recent Activity
                                    </h2>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-4">
                                        {recentActivities.map((activity) => (
                                            <div key={activity.id} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                                                <div className={`p-3 rounded-full ${
                                                    activity.type === 'adoption' ? 'bg-blue-100 dark:bg-blue-900' :
                                                    activity.type === 'favorite' ? 'bg-pink-100 dark:bg-pink-900' :
                                                    activity.type === 'approved' ? 'bg-green-100 dark:bg-green-900' :
                                                    'bg-purple-100 dark:bg-purple-900'
                                                }`}>
                                                    {activity.type === 'adoption' && <FaPaw className="text-blue-600 dark:text-blue-400" />}
                                                    {activity.type === 'favorite' && <FaHeart className="text-pink-600 dark:text-pink-400" />}
                                                    {activity.type === 'approved' && <FaHome className="text-green-600 dark:text-green-400" />}
                                                    {activity.type === 'application' && <FaEnvelope className="text-purple-600 dark:text-purple-400" />}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-gray-900 dark:text-white font-medium">
                                                        {activity.message}
                                                    </p>
                                                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                                                        {activity.date}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'settings' && (
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        Account Settings
                                    </h2>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-6">
                                        <div className="p-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl">
                                            <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                                                Account Security
                                            </h3>
                                            <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                                                Keep your account secure by regularly updating your password and enabling two-factor authentication.
                                            </p>
                                            <button className="mt-3 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                                                Change Password
                                            </button>
                                        </div>

                                        <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
                                            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
                                                Notification Preferences
                                            </h3>
                                            <p className="text-blue-700 dark:text-blue-300 text-sm">
                                                Manage how you receive notifications about adoption applications and pet updates.
                                            </p>
                                            <button className="mt-3 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                                                Configure Notifications
                                            </button>
                                        </div>

                                        <div className="p-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
                                            <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
                                                Danger Zone
                                            </h3>
                                            <p className="text-red-700 dark:text-red-300 text-sm">
                                                Permanently delete your account and all associated data. This action cannot be undone.
                                            </p>
                                            <button className="mt-3 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                                                Delete Account
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;