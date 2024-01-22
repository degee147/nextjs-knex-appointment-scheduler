"use client";
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext'; 

const ClientNavBar = () => {
    const { isLoggedIn } = useAuth();


    return (
        <nav className="fixed top-0 left-0 w-full bg-white dark:bg-zinc-800 z-50">
            <div className="max-w-5xl mx-auto flex justify-between items-center py-3 px-4">
                <div className="text-lg font-bold">YourLogo</div>
                <div className="flex gap-4">
                    <a href="/" className="hover:text-blue-500 transition duration-300">Home</a>
                    {!isLoggedIn && (
                        <>
                            <a href="/register" className="hover:text-blue-500 transition duration-300">Register</a>
                            <a href="/login" className="hover:text-blue-500 transition duration-300">Login</a>
                        </>
                    )}
                    {isLoggedIn && (
                        <>
                            <a href="/dashboard" className="hover:text-blue-500 transition duration-300">Dashboard</a>
                            <a href="/appointments" className="hover:text-blue-500 transition duration-300">Appointments</a>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default ClientNavBar;
