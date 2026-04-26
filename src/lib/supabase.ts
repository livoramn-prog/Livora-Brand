import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const publishableKey = process.env.SUPABASE_PUBLISHABLE_KEY;
const secretKey = process.env.SUPABASE_SECRET_KEY;

if (!url || !publishableKey) {
  throw new Error(
    "SUPABASE_URL ба SUPABASE_PUBLISHABLE_KEY-г .env.local дотор тохируулна уу."
  );
}

// Олон нийтийн уншилт (anon-тэй адил)
export const supabase = createClient(url, publishableKey, {
  auth: { persistSession: false },
});

// Админ үйлдэл (RLS-ийг тойрно). Зөвхөн серверт ашиглана.
export const supabaseAdmin = createClient(url, secretKey ?? publishableKey, {
  auth: { persistSession: false },
});
