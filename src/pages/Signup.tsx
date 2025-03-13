
import React from 'react';
import AuthLayout from '@/components/AuthLayout';
import AuthForm from '@/components/AuthForm';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const Signup = () => {
  const { user, isLoading } = useAuth();
  
  // Redirect to redirect page if user is already logged in
  if (user && !isLoading) {
    return <Navigate to="/redirect" />;
  }
  
  return (
    <AuthLayout>
      <AuthForm type="signup" />
    </AuthLayout>
  );
};

export default Signup;
