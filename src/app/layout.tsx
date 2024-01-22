
import React, { useContext, useState } from 'react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider, AuthContext } from '../contexts/AuthContext';
import ClientNavBar from "./components/ClientNavBar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Appointment Scheduler",
  description: "Allows users to find and book appointment with medical practitioners",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // const { isLoggedIn } = useContext(AuthContext);

  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          {/* Navigation Bar */}
          <ClientNavBar />
          <ToastContainer />
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
