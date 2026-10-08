const SUPABASE_URL =
    "https://gptdvdqmulmxabhgdniu.supabase.co";

const SUPABASE_KEY =
    "YOUR_ACTUAL_PUBLISHABLE_KEY";


const supabase =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );