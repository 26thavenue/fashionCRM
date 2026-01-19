import { createClient } from '../supabase/client';

export async function signUp(email: string, password: string) {
  try {
    const supabase = createClient();
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || 'Sign up failed');
  }
}

export async function signIn(email: string, password: string) {
  try {
    const supabase = createClient();
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || 'Sign in failed');
  }
}

export async function signOut() {
  try {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  } catch (error: any) {
    throw new Error(error.message || 'Sign out failed');
  }
}

export async function getCurrentUser() {
  try {
    const supabase = createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      throw new Error(error.message);
    }
    
    return user;
  } catch (error: any) {
    return null;
  }
}

export async function resetPassword(email: string) {
  try {
    const supabase = createClient();
    
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/reset-password`,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error: any) {
    throw new Error(error.message || 'Password reset failed');
  }
}