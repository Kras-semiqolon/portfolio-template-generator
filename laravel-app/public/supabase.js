const SUPABASE_URL =
    "https://gptdvdqmulmxabhgdniu.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_dxskvC3dCtvR-CfvPUgo_A_Ydky-adt";

window.supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );