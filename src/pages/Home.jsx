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
            image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop",
            description: "Friendly and energetic, loves playing fetch and going for walks."
        },
        {
            id: 2,
            name: "Whiskers",
            type: "Cat",
            breed: "Persian",
            age: "3 years",
            image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop",
            description: "Calm and affectionate, perfect for a quiet home environment."
        },
        {
            id: 3,
            name: "Charlie",
            type: "Dog",
            breed: "Beagle",
            age: "1 year",
            image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop",
            description: "Playful puppy with lots of energy, great with kids and families."
        },
        {
            id: 4,
            name: "Luna",
            type: "Cat",
            breed: "Siamese",
            age: "4 years",
            image: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?w=400&h=300&fit=crop",
            description: "Intelligent and social, loves attention and interactive toys."
        }
    ];

    const stats = [
        { number: "500+", label: "Pets Adopted", icon: "🏠" },
        { number: "200+", label: "Happy Families", icon: "😊" },
        { number: "50+", label: "Partner Shelters", icon: "🤝" },
        { number: "24/7", label: "Support Available", icon: "📞" }
    ];

    const processSteps = [
        {
            step: "1",
            title: "Browse Pets",
            description: "Explore our loving pets and find your perfect match using our advanced filters.",
            icon: "🔍",
            image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=200&fit=crop"
        },
        {
            step: "2",
            title: "Meet & Connect",
            description: "Schedule a meeting and get to know your potential new family member.",
            icon: "💬",
            image: "https://images.unsplash.com/photo-1560743641-3914f2c45636?w=300&h=200&fit=crop"
        },
        {
            step: "3",
            title: "Welcome Home",
            description: "Complete the adoption and start your journey with your new best friend.",
            icon: "🏠",
            image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=300&h=200&fit=crop"
        }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="text-center lg:text-left">
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                                Find Your
                                <span className="block text-yellow-400">Forever Friend</span>
                            </h1>
                            <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
                                Discover loving pets waiting for their perfect home. 
                                Begin your adoption journey and change a life today.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <Link 
                                    to="/pets" 
                                    className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center gap-2"
                                >
                                    🐾 Find Your Pet
                                </Link>
                                <Link 
                                    to="/about" 
                                    className="border-2 border-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105"
                                >
                                    Learn More
                                </Link>
                            </div>
                        </div>
                        <div className="lg:block">
                            <div className="grid grid-cols-2 gap-4">
                                <img 
                                    src="https://i.ibb.co/QFVtcngZ/Untitled-300-x-400-px.jpg" 
                                    alt="Cute cat" 
                                    className="rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300"
                                />
                                <img 
                                    src="https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=300&h=400&fit=crop" 
                                    alt="Cute cat" 
                                    className="rounded-2xl shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-300 mt-8"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white dark:from-gray-900 to-transparent"></div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center group">
                                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                                    <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                                        {stat.icon}
                                    </div>
                                    <div className="text-3xl lg:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                                        {stat.number}
                                    </div>
                                    <div className="text-gray-600 dark:text-gray-300 font-semibold text-lg">
                                        {stat.label}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Pets Section */}
            <section className="py-20 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                            Meet Our Stars
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            These wonderful companions are eagerly waiting to fill your home with love and joy. 
                            Each has a unique story and is ready to become part of your family.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredPets.map((pet) => (
                            <div key={pet.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 overflow-hidden group">
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={pet.image}
                                        alt={pet.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <div className="absolute top-4 right-4">
                                        <span className="bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
                                            {pet.type}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {pet.name}
                                    </h3>
                                    <div className="space-y-2 mb-4">
                                        <p className="text-gray-600 dark:text-gray-300 flex justify-between">
                                            <span className="font-medium">Breed:</span>
                                            <span>{pet.breed}</span>
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-300 flex justify-between">
                                            <span className="font-medium">Age:</span>
                                            <span>{pet.age}</span>
                                        </p>
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">
                                        {pet.description}
                                    </p>
                                    <Link 
                                        to="/pets"
                                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                                    >
                                        Meet {pet.name}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-16">
                        <Link 
                            to="/pets" 
                            className="inline-block bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white px-12 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl"
                        >
                            Discover All Pets →
                        </Link>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                            Simple Adoption Process
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Our streamlined process makes finding and adopting your perfect pet companion easy and joyful.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {processSteps.map((step, index) => (
                            <div key={index} className="relative group">
                                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 overflow-hidden">
                                    <div className="relative h-48 overflow-hidden">
                                        <img
                                            src={step.image}
                                            alt={step.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                        <div className="absolute top-4 left-4 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                                            {step.step}
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                                            {step.icon}
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Ready to Welcome Love?
                    </h2>
                    <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
                        Join our community of pet lovers and discover the joy of adoption. 
                        Your perfect companion is just a click away.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link 
                            to="/pets" 
                            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-12 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center gap-3"
                        >
                            🐶 Start Searching Now
                        </Link>
                        <Link 
                            to="/contact" 
                            className="border-2 border-white hover:bg-white hover:text-blue-600 px-12 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105"
                        >
                            Get In Touch
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;