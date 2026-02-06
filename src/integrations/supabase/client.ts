import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://tbmtzxtovnmscfljsopk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRibXR6eHRvdm5tc2NmbGpzb3BrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyMTgzMDAsImV4cCI6MjA4NTc5NDMwMH0.cDM7xbGeKv3PMxNw84JmXkpcgjtwyLafyV3-gmw7YuM';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
