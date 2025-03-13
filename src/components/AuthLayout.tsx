
import React, { ReactNode } from 'react';

type AuthLayoutProps = {
  children: ReactNode;
};

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-background to-secondary p-4 md:p-10">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center justify-center space-y-8">
        <div className="animate-slide-down">
          <div className="flex items-center gap-2 mb-2">
            <div className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
              Connect
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-center">Supabase to n8n Connector</h1>
          <p className="mt-4 text-lg text-center text-muted-foreground max-w-xl mx-auto">
            Seamlessly authenticate with Supabase and connect to your n8n instance with a single sign-in
          </p>
        </div>
        
        <div className="w-full max-w-md animate-slide-up">
          {children}
        </div>

        <footer className="text-sm text-center text-muted-foreground mt-8 animate-fade-in">
          <p>Secure authentication powered by Supabase</p>
        </footer>
      </div>
    </div>
  );
};

export default AuthLayout;
