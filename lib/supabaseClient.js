import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// One client works for both server components (public reads) and the browser
// (contact-form insert). Row Level Security in Supabase controls what's allowed.
export const supabase = createClient(url, anon);
