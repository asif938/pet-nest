import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <Navbar></Navbar>
            <main>
                <Outlet />
            </main>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;