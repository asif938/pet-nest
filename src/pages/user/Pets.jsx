import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxios from '../../hooks/useAxios';
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import { get } from 'react-hook-form';
import { getToken } from 'firebase/messaging';
import { messaging } from '../../firebase/firebase.init';

const Pets = () => {
    const axios = useAxios();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [selectedPet, setSelectedPet] = useState(null);
    // const [showAdoptionModal, setShowAdoptionModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'detail'
    const [loading, setLoading] = useState(false);
    

    const { data: allPets = [], isLoading } = useQuery({
        queryKey: ['allPets'],
        queryFn: async () => {
            const res = await axios.get('/pets');
            return res.data;
        },
        refetchInterval: 3000,
    });

    // Filter pets based on search and filter
    const filteredPets = allPets.filter(pet => {
        const matchesSearch = pet.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            pet.breed?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterType === 'all' || pet.type?.toLowerCase() === filterType;
        return matchesSearch && matchesFilter;
    });

    const handleViewDetails = (pet) => {
        setSelectedPet(pet);
        setViewMode('detail');
    };

    const handleAdoptionRequest = async () => {
        // const token = await getToken(messaging, {vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY});
        // setShowAdoptionModal(true);
        let token = "";

        // ✅ Ask only if user manually enabled notifications earlier
        if (Notification.permission === "granted") {
            try {
                token = await getToken(messaging, {
                    vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY
                });
            } catch (err) {
                console.warn("FCM token blocked or failed", err);
            }
        }

    
        if(!user){
            navigate('/login',{
                state: {
                    from: '/pets',
                    message: 'Please login to submit an adoption request'
                }
            });
            return;
        }

        try {
            setLoading(true);
            const adoptionData = {
                // Pet Information
                petId: selectedPet._id,
                petName: selectedPet.name || 'Unknown',
                petType: selectedPet.species || 'Unknown',
                petBreed: selectedPet.breed || 'Unknown',
                petAge: selectedPet.age || 'Unknown',
                petGender: selectedPet.gender || 'Unknown',
                petImage: selectedPet.image || '',
                adoptionFee: selectedPet.adoptionFee || 0,
                
                // Pet Location
                petLocation: selectedPet.location || 'Unknown',
                
                // Applicant Information
                applicantId: user._id || user.uid,
                applicantName: user.displayName || user.name || user.email || 'Unknown',
                applicantEmail: user.email || 'Unknown',
                applicantFcmToken: token || '',
                
                // Application Details
                status: 'pending',
                appliedDate: new Date().toISOString(),
                
                // Additional metadata from pet data
                petOwnerEmail: selectedPet.ownerEmail || '',
                petOwnerName: selectedPet.ownerName || '',
                
                // Pet description and status
                description: selectedPet.description || '',
                petStatus: selectedPet.status || 'available',
                
                // Timestamp from original pet data
                petCreatedAt: selectedPet.createdAt,
            };

            const response = await axios.post('/adoption-requests', adoptionData);
            if (response.data.insertedId) {
                Swal.fire('Success', 'Request sent successfully!', 'success');
                // setShowAddForm(false);
                // reset();
                // setImageFile(null);
                // setImagePreview(null);
                // fetchPets();
                // refetch();

            }
        } catch(error) {
            console.error(error);
        } finally {
            setLoading(false);
        }

    };

    // const submitAdoptionRequest = async (formData) => {
    //     try {
    //         await axios.post('/adoption-requests', {
    //             petId: selectedPet._id,
    //             ...formData
    //         });
    //         setShowAdoptionModal(false);
    //         alert('Adoption request sent successfully!');
    //     } catch (error) {
    //         console.error('Error sending adoption request:', error);
    //         alert('Failed to send adoption request. Please try again.');
    //     }
    // };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 dark:border-blue-400"></div>
            </div>
        );
    }

    // Pet Detail View
    if (viewMode === 'detail' && selectedPet) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    {/* Back Button */}
                    <button
                        onClick={() => setViewMode('grid')}
                        className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-6 transition-colors duration-200"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to All Pets
                    </button>

                    {/* Pet Detail Card */}
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Pet Images */}
                            <div className="p-6">
                                <div className="relative rounded-2xl overflow-hidden">
                                    <img
                                        src={selectedPet.image || '/api/placeholder/600/400'}
                                        alt={selectedPet.name}
                                        className="w-full h-96 object-cover rounded-2xl"
                                    />
                                    <div className="absolute top-4 right-4">
                                        <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                                            selectedPet.type === 'dog' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                                            selectedPet.type === 'cat' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                                            'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                        }`}>
                                            {selectedPet.type?.charAt(0).toUpperCase() + selectedPet.type?.slice(1)}
                                        </span>
                                    </div>
                                </div>
                                
                                {/* Additional Images Grid */}
                                <div className="grid grid-cols-3 gap-4 mt-4">
                                    {[1, 2, 3].map((num) => (
                                        <img
                                            key={num}
                                            src={selectedPet[`image${num}`] || selectedPet.image || '/api/placeholder/200/150'}
                                            alt={`${selectedPet.name} ${num}`}
                                            className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity duration-200"
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Pet Information */}
                            <div className="p-6 lg:p-8">
                                <div className="mb-6">
                                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                                        {selectedPet.name}
                                    </h1>
                                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
                                        {selectedPet.breed}
                                    </p>
                                    <div className="flex items-center gap-4 mb-4">
                                        <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                                            {selectedPet.adoptionFee ? `$${selectedPet.adoptionFee}` : 'Free Adoption'}
                                        </span>
                                        <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium">
                                            {selectedPet.age}
                                        </span>
                                        <span className={`flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                            selectedPet.gender === 'male' 
                                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                                : 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200'
                                        }`}>
                                            <span className={`w-2 h-2 rounded-full mr-2 ${
                                                selectedPet.gender === 'male' ? 'bg-blue-500' : 'bg-pink-500'
                                            }`}></span>
                                            {selectedPet.gender}
                                        </span>
                                    </div>
                                </div>

                                {/* Pet Details Grid */}
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Size</h3>
                                        <p className="text-gray-600 dark:text-gray-300">{selectedPet.size || 'Medium'}</p>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Color</h3>
                                        <p className="text-gray-600 dark:text-gray-300">{selectedPet.color || 'Various'}</p>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Vaccinated</h3>
                                        <p className="text-gray-600 dark:text-gray-300">{selectedPet.vaccinated ? 'Yes' : 'No'}</p>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Neutered/Spayed</h3>
                                        <p className="text-gray-600 dark:text-gray-300">{selectedPet.neutered ? 'Yes' : 'No'}</p>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">About {selectedPet.name}</h3>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                        {selectedPet.description || `${selectedPet.name} is a lovely ${selectedPet.breed} looking for a forever home. This sweet ${selectedPet.gender} is ${selectedPet.age} and ready to bring joy and companionship to a loving family.`}
                                    </p>
                                </div>

                                {/* Personality Traits */}
                                <div className="mb-8">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Personality</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedPet.traits?.map((trait, index) => (
                                            <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                                                {trait}
                                            </span>
                                        )) || ['Friendly', 'Playful', 'Affectionate'].map((trait, index) => (
                                            <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                                                {trait}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button
                                        onClick={handleAdoptionRequest}
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 text-lg"
                                    >
                                        Adopt {selectedPet.name}
                                    </button>
                                    <button className="px-6 py-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 font-semibold">
                                        Save for Later
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }

    // Grid View (Original)
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Find Your New Best Friend
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Browse our lovely pets waiting for their forever homes. Each one has a unique story and is ready to bring joy to your life.
                    </p>
                </div>

                {/* Search and Filter Section */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                        <div className="flex-1 w-full lg:w-auto">
                            <input
                                type="text"
                                placeholder="Search by name or breed..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            />
                        </div>
                        <div className="flex flex-wrap gap-4">
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            >
                                <option value="all">All Pets</option>
                                <option value="dog">Dogs</option>
                                <option value="cat">Cats</option>
                                <option value="bird">Birds</option>
                                <option value="rabbit">Rabbits</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Pets Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                    {filteredPets.map((pet) => (
                        <div
                            key={pet._id}
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
                        >
                            {/* Pet Image */}
                            <div className="relative overflow-hidden">
                                <img
                                    src={pet.image || '/api/placeholder/400/300'}
                                    alt={pet.name}
                                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300 cursor-pointer"
                                    onClick={() => handleViewDetails(pet)}
                                />
                                <div className="absolute top-4 right-4">
                                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                        pet.type === 'dog' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                                        pet.type === 'cat' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
                                        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                    }`}>
                                        {pet.type?.charAt(0).toUpperCase() + pet.type?.slice(1)}
                                    </span>
                                </div>
                            </div>

                            {/* Pet Info */}
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <h3 
                                        className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 cursor-pointer"
                                        onClick={() => handleViewDetails(pet)}
                                    >
                                        {pet.name}
                                    </h3>
                                    <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                                        {pet.age}
                                    </span>
                                </div>

                                <p className="text-gray-600 dark:text-gray-300 mb-2">
                                    <span className="font-semibold">Breed:</span> {pet.breed}
                                </p>
                                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                                    {pet.description}
                                </p>

                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center space-x-2">
                                        <span className={`inline-block w-3 h-3 rounded-full ${
                                            pet.gender === 'male' ? 'bg-blue-500' : 'bg-pink-500'
                                        }`}></span>
                                        <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                                            {pet.gender}
                                        </span>
                                    </div>
                                    <span className="text-lg font-bold text-green-600 dark:text-green-400">
                                        {pet.adoptionFee ? `$${pet.adoptionFee}` : 'Free'}
                                    </span>
                                </div>

                                {/* Action Button */}
                                <button
                                    onClick={() => handleViewDetails(pet)}
                                    className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                                >
                                    View Details & Adopt
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredPets.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">🐾</div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            No pets found
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Try adjusting your search or filter criteria.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

// Adoption Modal Component (Same as before)
// const AdoptionModal = ({ pet, onClose, onSubmit }) => {
//     const [formData, setFormData] = useState({
//         fullName: '',
//         email: '',
//         phone: '',
//         address: '',
//         experience: '',
//         message: ''
//     });

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         onSubmit(formData);
//     };

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     return (
//         <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-70 flex items-center justify-center p-4 z-50">
//             <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//                 {/* Modal Header */}
//                 <div className="p-6 border-b border-gray-200 dark:border-gray-700">
//                     <div className="flex items-center justify-between">
//                         <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
//                             Adopt {pet.name}
//                         </h2>
//                         <button
//                             onClick={onClose}
//                             className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
//                         >
//                             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                             </svg>
//                         </button>
//                     </div>
//                     <p className="text-gray-600 dark:text-gray-400 mt-2">
//                         Please fill out the adoption application form below.
//                     </p>
//                 </div>

//                 {/* Modal Body */}
//                 <form onSubmit={handleSubmit} className="p-6 space-y-6">
//                     {/* Pet Info Summary */}
//                     <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
//                         <div className="flex items-center space-x-4">
//                             <img
//                                 src={pet.image || '/api/placeholder/100/100'}
//                                 alt={pet.name}
//                                 className="w-16 h-16 rounded-lg object-cover"
//                             />
//                             <div>
//                                 <h3 className="font-semibold text-gray-900 dark:text-white">{pet.name}</h3>
//                                 <p className="text-sm text-gray-600 dark:text-gray-400">
//                                     {pet.breed} • {pet.age} • {pet.gender}
//                                 </p>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Form Fields */}
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                                 Full Name *
//                             </label>
//                             <input
//                                 type="text"
//                                 name="fullName"
//                                 required
//                                 value={formData.fullName}
//                                 onChange={handleChange}
//                                 className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                                 placeholder="Enter your full name"
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                                 Email Address *
//                             </label>
//                             <input
//                                 type="email"
//                                 name="email"
//                                 required
//                                 value={formData.email}
//                                 onChange={handleChange}
//                                 className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                                 placeholder="Enter your email"
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                                 Phone Number *
//                             </label>
//                             <input
//                                 type="tel"
//                                 name="phone"
//                                 required
//                                 value={formData.phone}
//                                 onChange={handleChange}
//                                 className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                                 placeholder="Enter your phone number"
//                             />
//                         </div>

//                         <div>
//                             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                                 Address *
//                             </label>
//                             <input
//                                 type="text"
//                                 name="address"
//                                 required
//                                 value={formData.address}
//                                 onChange={handleChange}
//                                 className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                                 placeholder="Enter your address"
//                             />
//                         </div>
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                             Previous Pet Experience
//                         </label>
//                         <textarea
//                             name="experience"
//                             rows="3"
//                             value={formData.experience}
//                             onChange={handleChange}
//                             className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                             placeholder="Tell us about your experience with pets"
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                             Additional Message
//                         </label>
//                         <textarea
//                             name="message"
//                             rows="3"
//                             value={formData.message}
//                             onChange={handleChange}
//                             className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
//                             placeholder="Any additional information you'd like to share..."
//                         />
//                     </div>

//                     {/* Modal Footer */}
//                     <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
//                         <button
//                             type="button"
//                             onClick={onClose}
//                             className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 font-semibold"
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             type="submit"
//                             className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-all duration-200 font-semibold transform hover:scale-105"
//                         >
//                             Submit Adoption Request
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

export default Pets;