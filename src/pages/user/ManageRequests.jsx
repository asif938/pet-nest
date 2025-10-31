import React, { useState } from 'react';
import { FaCheck, FaTimes, FaUser, FaCalendar, FaMapMarkerAlt, FaPaw } from 'react-icons/fa';
import useAxios from '../../hooks/useAxios';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const ManageRequests = () => {
    const [activeTab, setActiveTab] = useState('received');
    const axios = useAxios();
    const queryClient = useQueryClient();
    const { user } = useAuth();

    const { data: receivedRequests = [], isLoading: receivedLoading } = useQuery({
        queryKey: ['receivedRequests', user?.email],
        queryFn: async () => {
            const res = await axios.get(`/adoption-requests/received?ownerEmail=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
        refetchInterval: 3000,
    });

    const { data: sentRequests = [], isLoading: sentLoading } = useQuery({
        queryKey: ['sentRequests', user?.email],
        queryFn: async () => {
            const res = await axios.get(`/adoption-requests/sent?requesterEmail=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email,
        refetchInterval: 3000,
        
    });

    const updateRequestMutation = useMutation({
        mutationFn: async ({ id, status }) => {
            const res = await axios.patch(`/adoption-requests/${id}`, {
                status,
                reviewedAt: new Date().toISOString(),
            });
            return res.data;
        },
        onSuccess: (_, { requestType }) => {
            Swal.fire({
                title: 'Success!',
                text: 'Request updated successfully',
                icon: 'success',
                confirmButtonColor: '#3B82F6',
                background: document.documentElement.classList.contains('dark') ? '#1F2937' : '#fff',
                color: document.documentElement.classList.contains('dark') ? '#fff' : '#000',
            });
            if (requestType === 'received') queryClient.invalidateQueries(['receivedRequests', user?.email]);
            if (requestType === 'sent') queryClient.invalidateQueries(['sentRequests', user?.email]);
        },
        onError: () => {
            Swal.fire({
                title: 'Error!',
                text: 'Failed to update request',
                icon: 'error',
                confirmButtonColor: '#EF4444',
                background: document.documentElement.classList.contains('dark') ? '#1F2937' : '#fff',
                color: document.documentElement.classList.contains('dark') ? '#fff' : '#000',
            });
        },
    });

    const handleRequestAction = (id, status, requestType) => {
        updateRequestMutation.mutate({ id, status, requestType });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            case 'approved':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            case 'rejected':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending':
                return '⏳';
            case 'approved':
                return '✅';
            case 'rejected':
                return '❌';
            default:
                return '📋';
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (receivedLoading || sentLoading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex justify-center items-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 dark:border-blue-400"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center mb-4">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                            <FaPaw className="text-3xl text-blue-600 dark:text-blue-400" />
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Adoption Requests
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Manage adoption requests for your pets and track your own applications
                    </p>
                </div>

                {/* Tab navigation for phone  */}
                <div className="flex space-x-1 bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-lg mb-12 border border-gray-200 dark:border-gray-700 sm:hidden">
                    <button
                        onClick={() => setActiveTab('received')}
                        className={`flex-1 py-2 px-2 sm:py-4 sm:px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center text-xs sm:text-base gap-3 ${
                            activeTab === 'received'
                                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                    >
                        {/* <span className="text-lg">📥</span> */}
                        Received
                        <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                            activeTab === 'received' 
                                ? 'bg-white text-blue-600' 
                                : 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                        }`}>
                            {receivedRequests.length}
                        </span>
                    </button>
                    <button
                        onClick={() => setActiveTab('sent')}
                        className={`flex-1 py-2 px-2 sm:py-4 sm:px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center text-xs sm:text-base gap-3 ${
                            activeTab === 'sent'
                                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg transform scale-'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                    >
                        {/* <span className="text-lg">📤</span> */}
                        Sent
                        <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                            activeTab === 'sent' 
                                ? 'bg-white text-green-600' 
                                : 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300'
                        }`}>
                            {sentRequests.length}
                        </span>
                    </button>
                </div>

                {/* Tab Navigation for mediam large device*/}
                <div className="sm:flex w-[400px] sm:w-full space-x-1 bg-white dark:bg-gray-800 p-2 rounded-2xl shadow-lg mb-12 border border-gray-200 dark:border-gray-700 hidden">
                    <button
                        onClick={() => setActiveTab('received')}
                        className={`flex-1 py-2 px-2 sm:py-4 sm:px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center text-xs sm:text-base gap-3 ${
                            activeTab === 'received'
                                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg transform scale-'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                    >
                        <span className="text-lg">📥</span>
                        Received Requests
                        <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                            activeTab === 'received' 
                                ? 'bg-white text-blue-600' 
                                : 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                        }`}>
                            {receivedRequests.length}
                        </span>
                    </button>
                    <button
                        onClick={() => setActiveTab('sent')}
                        className={`flex-1 py-2 px-2 sm:py-4 sm:px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center text-xs sm:text-base gap-3 ${
                            activeTab === 'sent'
                                ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg transform scale-'
                                : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                        }`}
                    >
                        <span className="text-lg">📤</span>
                        Sent Requests
                        <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                            activeTab === 'sent' 
                                ? 'bg-white text-green-600' 
                                : 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300'
                        }`}>
                            {sentRequests.length}
                        </span>
                    </button>
                </div>

                {/* Received Requests Tab */}
                {activeTab === 'received' && (
                    <div>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                                Requests for Your Pets
                            </h2>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                {receivedRequests.length} request{receivedRequests.length !== 1 ? 's' : ''}
                            </div>
                        </div>

                        {receivedRequests.length === 0 ? (
                            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                                <div className="text-6xl mb-4 text-gray-300 dark:text-gray-600">📋</div>
                                <h3 className="text-2xl font-semibold text-gray-600 dark:text-gray-300 mb-3">
                                    No requests received
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                                    You haven't received any adoption requests for your pets yet. 
                                    Share your pet listings to get more visibility!
                                </p>
                            </div>
                        ) : (
                            <div className="grid gap-6 lg:grid-cols-2">
                                {receivedRequests.map((request) => (
                                    <div key={request._id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden">
                                        {/* Header Section */}
                                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center space-x-4">
                                                    <div className="relative">
                                                        <img
                                                            src={request.petImage || request.pet?.image || '/api/placeholder/200/200'}
                                                            alt={request.petName || request.pet?.name}
                                                            className="w-16 h-16 rounded-xl object-cover border-2 border-gray-200 dark:border-gray-600"
                                                        />
                                                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                                            <span className="text-white text-xs">🐾</span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                                            {request.petName || request.pet?.name}
                                                        </h3>
                                                        <p className="text-gray-600 dark:text-gray-400">
                                                            {request.petType || request.pet?.species} • {request.petBreed || request.pet?.breed}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <span className={`px-3 py-2 rounded-full text-sm font-semibold flex items-center gap-2 ${getStatusColor(request.status)}`}>
                                                        {getStatusIcon(request.status)} {request.status}
                                                    </span>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                        {formatDate(request.appliedDate || request.createdAt)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="p-6">
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                                {/* Requester Info */}
                                                <div className="space-y-4">
                                                    <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                                        <FaUser className="text-blue-500" />
                                                        Requester Information
                                                    </h4>
                                                    <div className="space-y-3">
                                                        <div>
                                                            <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                                                            <p className="font-medium text-gray-900 dark:text-white">
                                                                {request.applicantName || request.requesterName}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                                                            <p className="font-medium text-gray-900 dark:text-white">
                                                                {request.applicantEmail || request.requesterEmail}
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                            <FaMapMarkerAlt className="text-blue-500" />
                                                            <span className="text-sm">{request.petLocation || request.pet?.location}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Message */}
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                                        💬 Message
                                                    </h4>
                                                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                                                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                                            {request.additionalMessage || request.message || 'No message provided by the requester.'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            {request.status === 'pending' && (
                                                <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                                                    <button
                                                        onClick={() => handleRequestAction(request._id, 'rejected', 'received')}
                                                        disabled={updateRequestMutation.isLoading}
                                                        className="px-6 py-3 bg-red-500 hover:bg-red-600 disabled:bg-red-300 dark:disabled:bg-red-800 text-white rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 hover:scale-105 disabled:scale-100"
                                                    >
                                                        <FaTimes /> Reject Request
                                                    </button>
                                                    <button
                                                        onClick={() => handleRequestAction(request._id, 'approved', 'received')}
                                                        disabled={updateRequestMutation.isLoading}
                                                        className="px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-green-300 dark:disabled:bg-green-800 text-white rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 hover:scale-105 disabled:scale-100"
                                                    >
                                                        <FaCheck /> Approve Request
                                                    </button>
                                                </div>
                                            )}

                                            {/* Status Update Info */}
                                            {request.status !== 'pending' && request.reviewedAt && (
                                                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                                                        {request.status === 'approved' ? '✅ Approved' : '❌ Rejected'} on {formatDate(request.reviewedAt)}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Sent Requests Tab */}
                {activeTab === 'sent' && (
                    <div>
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                                Your Adoption Applications
                            </h2>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                {sentRequests.length} application{sentRequests.length !== 1 ? 's' : ''}
                            </div>
                        </div>

                        {sentRequests.length === 0 ? (
                            <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                                <div className="text-6xl mb-4 text-gray-300 dark:text-gray-600">📤</div>
                                <h3 className="text-2xl font-semibold text-gray-600 dark:text-gray-300 mb-3">
                                    No applications sent
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                                    You haven't sent any adoption requests yet. Browse available pets and find your perfect companion!
                                </p>
                            </div>
                        ) : (
                            <div className="grid gap-6 lg:grid-cols-2">
                                {sentRequests.map((request) => (
                                    <div key={request._id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden">
                                        {/* Header Section */}
                                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center space-x-4">
                                                    <div className="relative">
                                                        <img
                                                            src={request.petImage || request.pet?.image || '/api/placeholder/200/200'}
                                                            alt={request.petName || request.pet?.name}
                                                            className="w-16 h-16 rounded-xl object-cover border-2 border-gray-200 dark:border-gray-600"
                                                        />
                                                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                                            <span className="text-white text-xs">❤️</span>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                                            {request.petName || request.pet?.name}
                                                        </h3>
                                                        <p className="text-gray-600 dark:text-gray-400">
                                                            {request.petType || request.pet?.species} • {request.petBreed || request.pet?.breed}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <span className={`px-3 py-2 rounded-full text-sm font-semibold flex items-center gap-2 ${getStatusColor(request.status)}`}>
                                                        {getStatusIcon(request.status)} {request.status}
                                                    </span>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                        Applied on {formatDate(request.appliedDate || request.createdAt)}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="p-6">
                                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                                {/* Pet Owner Info */}
                                                <div className="space-y-4">
                                                    <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                                        <FaUser className="text-green-500" />
                                                        Pet Owner
                                                    </h4>
                                                    <div className="space-y-3">
                                                        <div>
                                                            <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                                                            <p className="font-medium text-gray-900 dark:text-white">
                                                                {request.petOwnerName || request.pet?.ownerName}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                                                            <p className="font-medium text-gray-900 dark:text-white">
                                                                {request.petOwnerEmail || request.pet?.ownerEmail}
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                            <FaMapMarkerAlt className="text-green-500" />
                                                            <span className="text-sm">{request.petLocation || request.pet?.location}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Your Message */}
                                                <div>
                                                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                                        💌 Your Application
                                                    </h4>
                                                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                                                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                                                            {request.additionalMessage || request.message || 'No additional message provided.'}
                                                        </p>
                                                        {request.previousExperience && (
                                                            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                                                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Previous Experience:</p>
                                                                <p className="text-gray-600 dark:text-gray-400 text-sm">
                                                                    {request.previousExperience}
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Status Info */}
                                            {request.status !== 'pending' && request.reviewedAt && (
                                                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl border-l-4 border-green-500">
                                                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                                                        {request.status === 'approved' 
                                                            ? '🎉 Congratulations! Your application has been approved. The pet owner will contact you soon.'
                                                            : 'Your application was not approved for this pet. Don\'t worry, there are many other pets waiting for a loving home!'
                                                        }
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
                                                        Updated on {formatDate(request.reviewedAt)}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageRequests;