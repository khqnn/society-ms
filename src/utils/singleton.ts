import { createClient } from "@supabase/supabase-js";


export class SupabaseClient {
    public static instance: any;

    private constructor() { }

    public static getInstance() {
        if (!SupabaseClient.instance) {
            SupabaseClient.instance = createClient(process.env.SUPABASE_URL || "", process.env.SUPABASE_KEY || "");
        }

        return SupabaseClient.instance;
    }
}