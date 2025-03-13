
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';
import { redirectToN8n } from '@/lib/supabase';

const Redirect = () => {
  const { user, session, isLoading } = useAuth();
  const [redirecting, setRedirecting] = useState(false);
  
  useEffect(() => {
    const handleRedirect = async () => {
      if (session && !redirecting) {
        setRedirecting(true);
        try {
          // Get JWT token and redirect to n8n
          const jwtToken = session.access_token;
          console.log("Redirecting to n8n with JWT token");
          await redirectToN8n(jwtToken);
        } catch (error) {
          console.error('Error redirecting to n8n:', error);
          setRedirecting(false);
        }
      }
    };
    
    handleRedirect();
  }, [session, redirecting]);
  
  // If not logged in, redirect to login
  if (!isLoading && !user) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background to-secondary">
      <div className="glass-card p-8 rounded-xl max-w-md w-full text-center animate-fade-in">
        <div className="flex justify-center mb-6">
          <Loader2 className="h-12 w-12 text-primary animate-spin" />
        </div>
        <h1 className="text-2xl font-semibold mb-2">Connecting to n8n</h1>
        <p className="text-muted-foreground mb-6">
          Please wait while we securely connect you to your n8n instance
        </p>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full animate-pulse-soft" style={{ width: '100%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Redirect;
