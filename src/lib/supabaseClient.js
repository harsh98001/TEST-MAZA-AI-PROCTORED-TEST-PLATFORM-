import { createClient } from '@supabase/supabase-js';

// Default to user's Supabase project credentials with fallback to env variables
const DEFAULT_SUPABASE_URL = 'https://wpsksnnrzzcvnlpunouu.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_ziH0QWp7DAIK61yy8Am8tw__DHz78S1';

const STORAGE_URL_KEY = 'test_maza_supabase_url';
const STORAGE_KEY_KEY = 'test_maza_supabase_anon_key';

export function getStoredSupabaseConfig() {
  const envUrl = import.meta.env.VITE_SUPABASE_URL;
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  const localUrl = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_URL_KEY) : null;
  const localKey = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY_KEY) : null;

  const url = (envUrl && envUrl.trim()) || (localUrl && localUrl.trim()) || DEFAULT_SUPABASE_URL;
  const anonKey = (envKey && envKey.trim()) || (localKey && localKey.trim()) || DEFAULT_SUPABASE_ANON_KEY;

  return { url, anonKey };
}

export function isConfigured() {
  const { url, anonKey } = getStoredSupabaseConfig();
  return Boolean(url && anonKey && url.startsWith('http'));
}

function initClient() {
  const { url, anonKey } = getStoredSupabaseConfig();

  return createClient(url, anonKey, {
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
 * Sign up with Email and Password (sends email confirmation link)
 */
export async function signUpWithPassword(email, password, fullName = '') {
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

  if (error) throw error;
  return data;
}

/**
 * Sign in with Email and Password
 */
export async function signInWithPassword(email, password) {
  const cleanEmail = email.trim().toLowerCase();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: cleanEmail,
    password,
  });

  if (error) throw error;
  return data;
}

/**
 * Send Magic Link / Passwordless confirmation email
 */
export async function sendMagicLink(email) {
  const cleanEmail = email.trim().toLowerCase();
  const redirectTo = typeof window !== 'undefined' ? window.location.origin : undefined;

  const { data, error } = await supabase.auth.signInWithOtp({
    email: cleanEmail,
    options: {
      emailRedirectTo: redirectTo,
      shouldCreateUser: true,
    },
  });

  if (error) throw error;
  return data;
}

/**
 * Reset Password email link
 */
export async function resetPasswordForEmail(email) {
  const cleanEmail = email.trim().toLowerCase();
  const redirectTo = typeof window !== 'undefined' ? `${window.location.origin}/settings` : undefined;

  const { data, error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
    redirectTo,
  });

  if (error) throw error;
  return data;
}
