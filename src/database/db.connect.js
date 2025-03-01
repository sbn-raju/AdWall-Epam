const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config();


const url = process.env.SUPABASE_URI;
const key = process.env.SUPABASE_ANON_KEY;


const supabase = createClient(url, key);


module.exports = supabase;