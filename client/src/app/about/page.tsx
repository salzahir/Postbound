'use client';

import React from 'react';
import Header from '../components/layout/Header';

function About() {
    return (
        <>
            <Header />
            <div className="flex flex-col items-center justify-center min-h-screen px-4">
                <h1 className="text-3xl font-bold text-white mb-6">About</h1>
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl">
                    <p className="text-gray-200 mb-4">
                        Welcome to our blog platform! This is a place where authors can share their thoughts and readers can engage with content.
                    </p>
                    <p className="text-gray-200 mb-4">
                        Our platform is built with modern technologies including Next.js, TypeScript, and Tailwind CSS.
                    </p>
                    <p className="text-gray-200">
                        We&apos;re committed to providing a great experience for both authors and readers.
                    </p>
                </div>
            </div>
        </>
    );
}

export default About;