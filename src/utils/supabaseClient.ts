import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mrqwznumevkipffsxwka.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ycXd6bnVtZXZraXBmZnN4d2thIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2Mzg0NjYsImV4cCI6MjA1OTIxNDQ2Nn0.UfRRhXDSqQQeVZJ9bQWHUnmg735otoki6RD3Y_VVu6I';
export const supabase = createClient(supabaseUrl, supabaseKey);