import React, { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { FaPlus, FaEdit, FaTrash, FaEye, FaPaw, FaMapMarkerAlt, FaCalendar } from 'react-icons/fa';
// import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
// import axios from 'axios';
import useAxios from '../../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

const MyPets = () => {
    // const [pets, setPets] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    // const axiosSecure = useAxiosSecure();
    const axios = useAxios();
    const { user } = useAuth();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    // const fetchPets = useCallback(async () => {
    //     try {
    //         const response = await axios.get(`/pets?ownerEmail=${user?.email}`);
    //         setPets(response.data);
    //     } catch (error) {
    //         console.error('Error fetching pets:', error);
    //         // Swal.fire('Error', 'Failed to fetch pets', 'error');
    //     } finally {
    //         setLoading(false);
    //     }
    // }, [axiosSecure, user?.email]);

    // // Fetch user's pets
    // useEffect(() => {
    //     if (user?.email) {
    //         fetchPets();
    //     }
    // }, [user, fetchPets]);

    // 🟢 Load pets using TanStack Query
    const {
        data: pets = [],
        isLoading,
        refetch,
    } = useQuery({
        queryKey: ['pets', user?.email],
        queryFn: async () => {
            if (!user?.email) return [];
            const res = await axios.get(`/pets?ownerEmail=${user.email}`);
            return res.data;
        },
        enabled: !!user?.email, // only run when user is available
    });


    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        console.log(file);

        // const reader = new FileReader();
        // reader.onloadend = () => setImagePreview(reader.result);
        // reader.readAsDataURL(file);

        const formData = new FormData();
        formData.append('image', file);

        const imagUploadUrl = `https://api.imgbb.com/1/upload?key=7fa66a0d72bc45500d659fb383c5b97b`
        const res = await axios.post(imagUploadUrl, formData);

        setImageFile(res.data.data.display_url);
        // if (file) {
        //     setImageFile(file);
        //     const reader = new FileReader();
        //     reader.onloadend = () => {
        //         setImagePreview(reader.result);
        //     };
        //     reader.readAsDataURL(file);
        // }
    };

    const onSubmit = async (data) => {
        try {
            setLoading(true);

            // Upload image if provided
            // let imageUrl = '';
            // if (imageFile) {
            //     const formData = new FormData();
            //     formData.append('image', imageFile);

            //     const imageResponse = await axiosSecure.post('/upload-image', formData, {
            //         headers: {
            //             'Content-Type': 'multipart/form-data',
            //         },
            //     });
            //     imageUrl = imageResponse.data.url;
            // }

            // Create pet data
            const petData = {
                ...data,
                image: imageFile,
                ownerEmail: user.email,
                ownerName: user.displayName,
                status: 'available',
                createdAt: new Date().toISOString()
            };

            const response = await axios.post('/pets', petData);

            if (response.data.insertedId) {
                Swal.fire('Success', 'Pet added successfully!', 'success');
                setShowAddForm(false);
                reset();
                setImageFile(null);
                setImagePreview(null);
                // fetchPets();
                refetch();

            }
        } catch (error) {
            console.error('Error adding pet:', error);
            Swal.fire('Error', 'Failed to add pet', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleDeletePet = async (petId) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                const response = await axios.delete(`/pets/${petId}`);
                if (response.data.deletedCount > 0) {
                    Swal.fire('Deleted!', 'Pet has been deleted.', 'success');
                    refetch();
                }
            } catch (error) {
                console.error('Error deleting pet:', error);
                Swal.fire('Error', 'Failed to delete pet', 'error');
            }
        }
    };

    if (isLoading && pets.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white">My Pets</h1>
                <button
                    onClick={() => setShowAddForm(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
                >
                    <FaPlus /> Add Pet
                </button>
            </div>

            {/* Add Pet Form Modal */}
            {showAddForm && (
                <div className="fixed inset-0 bg-black/50 dark:bg-slate-900/75 flex items-center justify-center z-50 p-4 ">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700 modal-scrollbar">
                    {/* bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-200 dark:border-gray-700 modal-scrollbar */}
                        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Pet</h2>
                            <button
                                onClick={() => {
                                    setShowAddForm(false);
                                    reset();
                                    setImageFile(null);
                                    setImagePreview(null);
                                }}
                                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl transition-colors"
                            >
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Pet Name *
                                    </label>
                                    <input
                                        {...register('name', { required: 'Pet name is required' })}
                                        type="text"
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                                        placeholder="Enter pet name"
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.name.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Species *
                                    </label>
                                    <select
                                        {...register('species', { required: 'Species is required' })}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                                    >
                                        <option value="">Select species</option>
                                        <option value="dog">Dog</option>
                                        <option value="cat">Cat</option>
                                        <option value="bird">Bird</option>
                                        <option value="rabbit">Rabbit</option>
                                        <option value="fish">Fish</option>
                                        <option value="other">Other</option>
                                    </select>
                                    {errors.species && (
                                        <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.species.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Breed
                                    </label>
                                    <input
                                        {...register('breed')}
                                        type="text"
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                                        placeholder="Enter breed"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Age (months) *
                                    </label>
                                    <input
                                        {...register('age', {
                                            required: 'Age is required',
                                            min: { value: 1, message: 'Age must be at least 1 month' }
                                        })}
                                        type="number"
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                                        placeholder="Enter age in months"
                                    />
                                    {errors.age && (
                                        <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.age.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Gender *
                                    </label>
                                    <select
                                        {...register('gender', { required: 'Gender is required' })}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                                    >
                                        <option value="">Select gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                    {errors.gender && (
                                        <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.gender.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Location *
                                    </label>
                                    <input
                                        {...register('location', { required: 'Location is required' })}
                                        type="text"
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                                        placeholder="Enter location"
                                    />
                                    {errors.location && (
                                        <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.location.message}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Description *
                                </label>
                                <textarea
                                    {...register('description', { required: 'Description is required' })}
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-colors"
                                    placeholder="Describe your pet's personality, habits, and any special needs..."
                                />
                                {errors.description && (
                                    <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.description.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Pet Image
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900 dark:file:text-blue-300 transition-colors"
                                />
                                {imagePreview && (
                                    <div className="mt-4">
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Image Preview:</p>
                                        <img
                                            src={imagePreview}
                                            alt="Preview"
                                            className="w-32 h-32 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowAddForm(false);
                                        reset();
                                        setImageFile(null);
                                        setImagePreview(null);
                                    }}
                                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {loading ? 'Adding Pet...' : 'Add Pet'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Pets Grid */}
            {pets.length === 0 ? (
                <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <div className="text-6xl mb-4 text-gray-300 dark:text-gray-600">🐾</div>
                    <h3 className="text-2xl font-bold text-gray-600 dark:text-gray-300 mb-3">No pets added yet</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                        Start by adding your first pet to find them a loving forever home
                    </p>
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-3 mx-auto transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        <FaPlus className="text-lg" />
                        Add Your First Pet
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {pets.map((pet) => (
                        <div
                            key={pet._id}
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-200 dark:border-gray-700 overflow-hidden group"
                        >
                            {/* Image Section */}
                            <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 overflow-hidden">
                                {pet.image ? (
                                    <img
                                        src={pet.image}
                                        alt={pet.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-500 text-5xl">
                                        🐾
                                    </div>
                                )}

                                {/* Status Badge */}
                                <div className="absolute top-3 right-3">
                                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold shadow-md ${pet.status === 'available'
                                        ? 'bg-green-500 text-white dark:bg-green-600'
                                        : 'bg-red-500 text-white dark:bg-red-600'
                                        }`}>
                                        {pet.status === 'available' ? 'Available' : 'Adopted'}
                                    </span>
                                </div>

                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>

                            {/* Content Section */}
                            <div className="p-5">
                                {/* Pet Name and Basic Info */}
                                <div className="mb-4 flex justify-between items-center">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {pet.name}
                                    </h3>
                                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 mb-3">
                                        <span className="flex items-center gap-1">
                                            <FaPaw className="text-blue-500" />
                                            {pet.species}
                                        </span>
                                        {pet.gender && (
                                            <span className={`flex items-center gap-1 ${pet.gender === 'male' ? 'text-blue-600' : 'text-pink-600'
                                                }`}>
                                                {pet.gender === 'male' ? '♂' : '♀'} {pet.gender}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Pet Details */}
                                <div className="space-y-2 mb-4">
                                    {pet.breed && (
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-500 dark:text-gray-400 font-medium">Breed:</span>
                                            <span className="text-gray-700 dark:text-gray-300">{pet.breed}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500 dark:text-gray-400 font-medium">Age:</span>
                                        <span className="text-gray-700 dark:text-gray-300">{pet.age} months</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-500 dark:text-gray-400 font-medium">Location:</span>
                                        <span className="text-gray-700 dark:text-gray-300 flex items-center gap-1">
                                            <FaMapMarkerAlt className="text-red-500 text-xs" />
                                            {pet.location}
                                        </span>
                                    </div>
                                </div>

                                {/* Description */}
                                {/* {pet.description && (
                                    <div className="mb-4">
                                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                                            {pet.description}
                                        </p>
                                    </div>
                                )} */}

                                {/* Action Buttons */}
                                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                                        <FaCalendar className="text-gray-400" />
                                        Added {new Date(pet.createdAt).toLocaleDateString()}
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            className="p-2.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition-all duration-200 hover:scale-110 group/edit"
                                            title="Edit Pet"
                                        >
                                            <FaEdit className="group-hover/edit:rotate-12 transition-transform" />
                                        </button>
                                        <button
                                            onClick={() => handleDeletePet(pet._id)}
                                            className="p-2.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-all duration-200 hover:scale-110 group/delete"
                                            title="Delete Pet"
                                        >
                                            <FaTrash className="group-hover/delete:shake transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Hover Effect Border */}
                            <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/20 dark:group-hover:border-blue-400/20 rounded-2xl pointer-events-none transition-all duration-300"></div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyPets;
