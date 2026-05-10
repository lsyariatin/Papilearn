import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://apzjzasjnrwewjadfwdu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwemp6YXNqbnJ3ZXdqYWRmd2R1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg0MDI2NTgsImV4cCI6MjA5Mzk3ODY1OH0.h1C3_0QQbtxVuR0-wuAMGEXJnnSNneU5rGylCcAJ1rk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
