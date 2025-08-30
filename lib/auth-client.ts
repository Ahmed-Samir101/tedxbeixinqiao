import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
});

// Extend the signOut function to properly clear all cookies and local storage
const originalSignOut = authClient.signOut;

export const signIn = authClient.signIn;
export const signUp = authClient.signUp;
export const useSession = authClient.useSession;

// Enhanced signOut function that ensures complete logout
export const signOut = async () => {
  // Call the original signOut function
  await originalSignOut();

  // Clear all cookies by setting expiration in the past
  document.cookie.split(';').forEach((cookie) => {
    const [name] = cookie.trim().split('=');
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });

  // Clear any auth-related localStorage items
  localStorage.removeItem('auth-token');
  localStorage.removeItem('user');

  // Add a small delay to ensure all async operations complete
  return new Promise((resolve) => setTimeout(resolve, 100));
};
