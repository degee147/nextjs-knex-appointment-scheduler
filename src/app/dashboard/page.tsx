"use client";

import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import useAuthRedirect from '../../hooks/useAuthRedirect';

export default function Register() {
  useAuthRedirect();
  return (
    <>Dashboard Page</>
  );
}
