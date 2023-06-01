"use strict";
exports.__esModule = true;
exports.SupabaseClient = void 0;
var supabase_js_1 = require("@supabase/supabase-js");
var SupabaseClient = /** @class */ (function () {
    function SupabaseClient() {
    }
    SupabaseClient.getInstance = function () {
        if (!SupabaseClient.instance) {
            SupabaseClient.instance = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL || "", process.env.SUPABASE_KEY || "");
        }
        return SupabaseClient.instance;
    };
    return SupabaseClient;
}());
exports.SupabaseClient = SupabaseClient;
