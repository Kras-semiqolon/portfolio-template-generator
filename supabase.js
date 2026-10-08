const SUPABASE_URL =
    "https://gptdvdqmulmxabhgdniu.supabase.co";

const SUPABASE_KEY =
    "PASTE_YOUR_SUPABASE_PUBLISHABLE_KEY_HERE";

const supabase =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );