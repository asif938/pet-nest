import React from 'react';
import { Link } from 'react-router';

const Home = () => {
    const featuredPets = [
        {
            id: 1,
            name: "Buddy",
            type: "Dog",
            breed: "Golden Retriever",
            age: "2 years",
            image: "🐕",
            description: "Friendly and energetic, loves playing fetch and going for walks."
        },
        {
            id: 2,
            name: "Whiskers",
            type: "Cat",
            breed: "Persian",
            age: "3 years",
            image: "🐱",
            description: "Calm and affectionate, perfect for a quiet home environment."
        },
        {
            id: 3,
            name: "Charlie",
            type: "Dog",
            breed: "Beagle",
            age: "1 year",
            image: "🐶",
            description: "Playful puppy with lots of energy, great with kids and families."
        },
        {
            id: 4,
            name: "Luna",
            type: "Cat",
            breed: "Siamese",
            age: "4 years",
            image: "😸",
            description: "Intelligent and social, loves attention and interactive toys."
        }
    ];

    const stats = [
        { number: "500+", label: "Pets Adopted" },
        { number: "200+", label: "Happy Families" },
        { number: "50+", label: "Partner Shelters" },
        { number: "24/7", label: "Support Available" }
    ];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Find Your Perfect
                            <span className="block text-yellow-400">Furry Friend</span>
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
                            Connect with loving pets waiting for their forever homes. 
                            Start your adoption journey today and make a difference in a pet's life.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link 
                                to="/pets" 
                                className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 shadow-lg"
                            >
                                Browse Available Pets
                            </Link>
                            <Link 
                                to="/about" 
                                className="border-2 border-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent"></div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-gray-600 dark:text-gray-300 font-medium">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Pets Section */}
            <section className="py-20 bg-gray-50 dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Featured Pets
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Meet some of our wonderful pets looking for loving homes. 
                            Each one has a unique personality and story to share.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredPets.map((pet) => (
                            <div key={pet.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                                <div className="p-6">
                                    <div className="text-6xl text-center mb-4">{pet.image}</div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                        {pet.name}
                                    </h3>
                                    <div className="space-y-1 mb-4">
                                        <p className="text-gray-600 dark:text-gray-300">
                                            <span className="font-medium">Type:</span> {pet.type}
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            <span className="font-medium">Breed:</span> {pet.breed}
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            <span className="font-medium">Age:</span> {pet.age}
                                        </p>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                                        {pet.description}
                                    </p>
                                    <button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200">
                                        Learn More
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link 
                            to="/pets" 
                            className="inline-block bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-colors duration-200"
                        >
                            View All Available Pets
                        </Link>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 bg-white dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            How Pet Adoption Works
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Our simple process makes it easy to find and adopt your perfect pet companion.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🔍</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                1. Browse & Search
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Explore our database of available pets. Use filters to find the perfect match for your lifestyle.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">💬</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                2. Meet & Connect
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Schedule a meeting with your chosen pet. Get to know their personality and see if it's a good fit.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🏠</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                3. Welcome Home
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                Complete the adoption process and welcome your new family member home with ongoing support.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Ready to Adopt?
                    </h2>
                    <p className="text-xl mb-8 text-blue-100">
                        Join thousands of families who have found their perfect pet companion through PetNest. 
                        Your new best friend is waiting for you.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link 
                            to="/pets" 
                            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 shadow-lg"
                        >
                            Start Your Search
                        </Link>
                        <Link 
                            to="/contact" 
                            className="border-2 border-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;