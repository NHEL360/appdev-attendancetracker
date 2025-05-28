import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vrjwimgpnkarmqswugay.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyandpbWdwbmthcm1xc3d1Z2F5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzMjIzODQsImV4cCI6MjA2Mzg5ODM4NH0.9qr1KNuozKu0Zo_B9F-Lm0wLBKuqzXOFWvzrpctzvDE';
export const supabase = createClient(supabaseUrl, supabaseKey);