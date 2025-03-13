
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Client
export const supabase = createClient(
  'https://qszprjcrzyfczwetkuno.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzenByamNyenlmY3p3ZXRrdW5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE3ODEyNzUsImV4cCI6MjA1NzM1NzI3NX0.BHJiwnL79pIdjdhz8b7YuglpRejdTUDFMG6DfFMqoTY'
);

// Function to check if a user is the first registered user
export async function isFirstUser(): Promise<boolean> {
  const { count, error } = await supabase
    .from('user_roles')
    .select('*', { count: 'exact', head: true });
  
  if (error) {
    console.error('Error checking if first user:', error);
    return false;
  }
  
  return count === 0;
}

// Function to assign role to user
export async function assignUserRole(userId: string): Promise<void> {
  const isFirst = await isFirstUser();
  const role = isFirst ? 'owner' : 'user';
  
  const { error } = await supabase
    .from('user_roles')
    .insert([{ user_id: userId, role }]);
  
  if (error) {
    console.error('Error assigning user role:', error);
  }
}

// Function to redirect to n8n with JWT
export async function redirectToN8n(jwt: string): Promise<void> {
  window.location.href = `https://n8n-auth.onrender.com?jwt=${jwt}`;
}

// Check authentication status and redirect if logged in
export async function checkAuth(): Promise<{ session: any | null, isLoading: boolean }> {
  const { data, error } = await supabase.auth.getSession();
  
  if (error) {
    console.error('Error checking auth:', error);
    return { session: null, isLoading: false };
  }
  
  return { session: data.session, isLoading: false };
}
