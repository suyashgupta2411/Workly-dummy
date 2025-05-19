import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '@/types/supabase';

export const getServerClient = () => {
  const cookieStore = cookies();
  return createServerComponentClient<Database>({ cookies: () => cookieStore });
};

export const getUserProfile = async () => {
  const supabase = getServerClient();
  
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();
  if (sessionError || !session) return null;

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', session.user.id)
    .single();

  if (profileError || !profile) return null;

  return {
    ...profile,
    email: session.user.email
  };
};