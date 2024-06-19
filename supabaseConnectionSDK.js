
import { createClient } from '@supabase/supabase-js'

const supabaseURL = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;


// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseURL, supabaseKey);


export default supabase