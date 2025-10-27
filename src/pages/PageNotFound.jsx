import React from 'react';
import { FaHome, FaArrowLeft, FaPaw } from 'react-icons/fa';
import { useNavigate } from 'react-router';

const PageNotFound = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    const goHome = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl w-full text-center">
                <div className="relative mb-8">
                    <div className="text-9xl sm:text-10xl font-bold text-gray-300 dark:text-gray-600 opacity-50 select-none">
                        404
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-6xl sm:text-8xl text-amber-500 dark:text-amber-400 animate-bounce">
                            <FaPaw className="mx-auto transform rotate-45" />
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 sm:p-12 mb-8 border border-gray-200 dark:border-gray-700">
                    <div className="w-20 h-20 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FaPaw className="text-3xl text-amber-500 dark:text-amber-400" />
                    </div>
                    
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Lost Little Paw?
                    </h1>
                    
                    <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-2 max-w-2xl mx-auto">
                        This page seems to have wandered off like a curious kitten!
                    </p>
                    
                    <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-xl mx-auto">
                        Don't worry, let's get you back to finding your perfect furry friend.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button
                            onClick={goBack}
                            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg"
                        >
                            <FaArrowLeft className="text-lg" />
                            Go Back
                        </button>
                        
                        <button
                            onClick={goHome}
                            className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 dark:from-blue-600 dark:to-green-600 dark:hover:from-blue-700 dark:hover:to-green-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-3 shadow-lg"
                        >
                            <FaHome className="text-lg" />
                            Find Pets
                        </button>
                    </div>
                </div>

                {/* <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        While you're here...
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex flex-col items-center p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                            <div className="text-2xl mb-2">🐕</div>
                            <p>Browse adorable dogs</p>
                        </div>
                        <div className="flex flex-col items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <div className="text-2xl mb-2">🐈</div>
                            <p>Meet lovely cats</p>
                        </div>
                        <div className="flex flex-col items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <div className="text-2xl mb-2">🐾</div>
                            <p>Find your new best friend</p>
                        </div>
                    </div>
                </div> */}

                <div className="absolute top-10 left-10 w-20 h-20 bg-amber-200 dark:bg-amber-800 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute bottom-20 right-10 w-16 h-16 bg-green-200 dark:bg-green-800 rounded-full opacity-30 animate-pulse delay-75"></div>
                <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-blue-200 dark:bg-blue-800 rounded-full opacity-25 animate-pulse delay-150"></div>
            </div>
        </div>
    );
};

export default PageNotFound;