import { supabase } from './supabaseClient';

// Every function is wrapped so that if the database is unreachable
// (e.g. during a build with no network) the site still compiles.

export async function getCities() {
  try {
    const { data } = await supabase
      .from('cities')
      .select('*')
      .eq('published', true)
      .order('sort_order');
    return data || [];
  } catch {
    return [];
  }
}

export async function getCity(slug) {
  try {
    const { data } = await supabase.from('cities').select('*').eq('slug', slug).single();
    return data || null;
  } catch {
    return null;
  }
}

export async function getProjects() {
  try {
    const { data } = await supabase.from('projects').select('*').order('sort_order');
    return data || [];
  } catch {
    return [];
  }
}

export async function getPricing() {
  try {
    const { data } = await supabase.from('pricing').select('*').order('sort_order');
    return data || [];
  } catch {
    return [];
  }
}

export async function getTestimonials() {
  try {
    const { data } = await supabase.from('testimonials').select('*').order('sort_order');
    return data || [];
  } catch {
    return [];
  }
}

export async function getPosts() {
  try {
    const { data } = await supabase
      .from('posts')
      .select('*')
      .eq('status', 'Published')
      .order('published_at', { ascending: false });
    return data || [];
  } catch {
    return [];
  }
}

export async function getSetting(key) {
  try {
    const { data } = await supabase.from('settings').select('value').eq('key', key).single();
    return data ? data.value : null;
  } catch {
    return null;
  }
}
