"use client";

import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Layout from '../layout';
import { toast } from 'react-toastify';

import { TextField, Button, Box, Typography, Container } from '@mui/material';
// import { useSnackbar } from '../../contexts/SnackbarContext';


// import { useCustomToast } from '../../hooks/useCustomToast';


export default function Login() {

  // const toast = useCustomToast();

  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // const { enqueueSnackbar } = useSnackbar();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    // Implement your sign-in logic here
    // console.log('Email:', email, 'Password:', password);
    // You might want to send these values to your backend server

    setIsLoading(true);

    if (!email || !password) {
      toast("Email and Password are required");
      // toast("error", 'Email and Password are required', 'Error');
      // alert('Email and Password are required');
      // enqueueSnackbar('Email and Password are required', { type: 'success' });
      setIsLoading(false);
      return;
    }


    // Construct formData object
    const formData = {
      email,
      password,
    };


    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL + '/api/login';

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
        toast.success("Login successful");
        login(data.token, data.user_id);
        setIsLoading(false);
        router.push('/dashboard');
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
    // <Layout>
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Container component="main" maxWidth="xs">

        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div className="w-full max-w-xm">

            <form onSubmit={handleSignIn} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <Typography component="h1" variant="h5" sx={{ textAlign: 'center' }}>
                Sign in
              </Typography>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} />
                <p className="text-black-500 text-xs italic">Enter your email.</p>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} />
                <p className="text-black-500 text-xs italic">Enter your password.</p>
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
                    "Sign In"
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
