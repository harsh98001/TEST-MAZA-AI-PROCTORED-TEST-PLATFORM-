import { createClient } from '@supabase/supabase-js';

const STORAGE_URL_KEY = 'test_maza_supabase_url';
const STORAGE_KEY_KEY = 'test_maza_supabase_anon_key';

export function getStoredSupabaseConfig() {
  const envUrl = import.meta.env.VITE_SUPABASE_URL;
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  const localUrl = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_URL_KEY) : null;
  const localKey = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY_KEY) : null;

  const url = (envUrl && envUrl.trim()) || (localUrl && localUrl.trim()) || '';
  const anonKey = (envKey && envKey.trim()) || (localKey && localKey.trim()) || '';

  return { url, anonKey };
}

export function isConfigured() {
  const { url, anonKey } = getStoredSupabaseConfig();
  return Boolean(url && anonKey && url.startsWith('http') && anonKey.length > 10);
}

function initClient() {
  const { url, anonKey } = getStoredSupabaseConfig();
  const fallbackUrl = 'https://placeholder-project.supabase.co';
  const fallbackKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy';

  const clientUrl = url && url.startsWith('http') ? url : fallbackUrl;
  const clientKey = anonKey && anonKey.length > 10 ? anonKey : fallbackKey;

  return createClient(clientUrl, clientKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      flowType: 'pkce',
    },
  });
}

export let supabase = initClient();
export let isSupabaseConfigured = isConfigured();

export function saveSupabaseConfig(url, anonKey) {
  if (typeof window !== 'undefined') {
    if (url) localStorage.setItem(STORAGE_URL_KEY, url.trim());
    if (anonKey) localStorage.setItem(STORAGE_KEY_KEY, anonKey.trim());
    supabase = initClient();
    isSupabaseConfigured = isConfigured();
  }
}

export function clearSupabaseConfig() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_URL_KEY);
    localStorage.removeItem(STORAGE_KEY_KEY);
    supabase = initClient();
    isSupabaseConfigured = isConfigured();
  }
}

/**
 * Send 6-digit OTP code / Magic Link to real email address
 */
export async function sendEmailVerification(email) {
  if (!isConfigured()) {
    throw new Error('Supabase project is not connected. Please provide your Supabase URL and Anon Key.');
  }

  const cleanEmail = email.trim().toLowerCase();
  const redirectTo = typeof window !== 'undefined' ? window.location.origin : undefined;

  const { data, error } = await supabase.auth.signInWithOtp({
    email: cleanEmail,
    options: {
      emailRedirectTo: redirectTo,
      shouldCreateUser: true,
    },
  });

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Verify 6-digit OTP code entered by the user
 */
export async function verifyEmailCode(email, token, type = 'email') {
  if (!isConfigured()) {
    throw new Error('Supabase project is not connected. Please provide your Supabase URL and Anon Key.');
  }

  const cleanEmail = email.trim().toLowerCase();
  const cleanToken = token.trim();

  // Try standard email OTP first
  let result = await supabase.auth.verifyOtp({
    email: cleanEmail,
    token: cleanToken,
    type: type || 'email',
  });

  // If failed with 'email' type, try 'signup' or 'magiclink'
  if (result.error && type === 'email') {
    const signupResult = await supabase.auth.verifyOtp({
      email: cleanEmail,
      token: cleanToken,
      type: 'signup',
    });
    if (!signupResult.error) {
      return signupResult;
    }
  }

  if (result.error) {
    throw result.error;
  }

  return result;
}

/**
 * Sign up with Password and send confirmation email
 */
export async function signUpWithPassword(email, password, fullName = '') {
  if (!isConfigured()) {
    throw new Error('Supabase project is not connected. Please provide your Supabase URL and Anon Key.');
  }

  const cleanEmail = email.trim().toLowerCase();
  const redirectTo = typeof window !== 'undefined' ? window.location.origin : undefined;

  const { data, error } = await supabase.auth.signUp({
    email: cleanEmail,
    password,
    options: {
      emailRedirectTo: redirectTo,
      data: {
        full_name: fullName.trim() || cleanEmail.split('@')[0],
      },
    },
  });

  if (error) {
    throw error;
  }

  return data;
}

/**
 * Sign in with Email and Password
 */
export async function signInWithPassword(email, password) {
  if (!isConfigured()) {
    throw new Error('Supabase project is not connected. Please provide your Supabase URL and Anon Key.');
  }

  const cleanEmail = email.trim().toLowerCase();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: cleanEmail,
    password,
  });

  if (error) {
    throw error;
  }

  return data;
}
