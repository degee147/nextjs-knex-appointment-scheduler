"use client";

import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Layout from '../layout';
import { TextField, Button, Box, Typography, Container } from '@mui/material';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { toast } from 'react-toastify';


export default function Register() {

  // const [formData, setFormData] = useState({
  //   name: '',
  //   email: '',
  //   password: '',
  //   is_provider: false
  // });

  // const [passwordConfirm, setPasswordConfirm] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isProvider, setIsProvider] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!fullName || !email || !password) {
      toast('Name, Email and Password are required');
      setIsLoading(false);
      return;
    }

    if (password !== passwordConfirm) {
      toast.warn('Passwords do not match');
      setIsLoading(false);
      return;
    }


    // Construct formData object
    const formData = {
      name: fullName,
      email,
      password,
      is_provider: isProvider
    };


    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL + '/api/register';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (data.token) {
        setIsLoading(false);
        login(data.token, data.user_id);
        toast.success("Registration Successful. You're now logged in")
        router.push('/book-appointment');
        return;
      }
      toast.error(data.message);
      console.log(data);
      // Handle success or show error messages as needed
    } catch (error) {
      console.error('Error:', error);
    }

    setIsLoading(false);
  };


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Container component="main" maxWidth="xs">

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div className="w-full max-w-xm">

            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
              <Typography component="h1" variant="h5" sx={{ textAlign: 'center' }}>
                Sign Up
              </Typography>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Full Name
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Full name"
                  value={fullName} onChange={(e) => setFullName(e.target.value)} />
                <p className="text-black-500 text-xs italic">Enter your full name</p>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email"
                  value={email} onChange={(e) => setEmail(e.target.value)} />
                <p className="text-black-500 text-xs italic">Enter your email</p>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="password" value={password}
                  onChange={(e) => setPassword(e.target.value)} />
                <p className="text-black-500 text-xs italic">Please choose a password.</p>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="passwordConfirm">
                  Confirm Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="passwordConfirm"
                  type="password"
                  placeholder="Confirm Password"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
                <p className="text-black-500 text-xs italic">Re-enter your password</p>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="is_provider">
                  <input className="mr-2 leading-tight" type="checkbox" id="is_provider" name="is_provider" checked={isProvider} onChange={(e) => setIsProvider(e.target.checked)} />
                  <span className="text-sm">
                    I'm a Medical Practitioner
                  </span>
                </label>
              </div>
              <div className="flex items-center justify-between">

                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center justify-center"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Sign Up"
                  )}
                </button>
                <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                  Forgot Password?
                </a>
              </div>
            </form>
            <p className="text-center text-gray-500 text-xs">
              ©2024 Corp. All rights reserved.
            </p>
          </div>

        </Box>
      </Container>
    </main>
  );
}
