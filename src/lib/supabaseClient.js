import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('⚠️ Variables de entorno no configuradas. Verifica el archivo .env.local');
}

console.log("Supabase URL:", supabaseUrl ? '✓ Configurada' : '✗ No encontrada');

export const supabase = createClient(supabaseUrl, supabaseAnonKey);