import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const supabase = createClient(supabaseUrl, serviceRoleKey);

  // Create admin user
  const { data: userData, error: createError } = await supabase.auth.admin.createUser({
    email: "rv414511@gmail.com",
    password: "@Ravi1761#",
    email_confirm: true,
    user_metadata: { full_name: "Ravi Verma" },
  });

  if (createError) {
    return new Response(JSON.stringify({ error: createError.message }), { status: 400 });
  }

  // Assign admin role
  const { error: roleError } = await supabase
    .from("user_roles")
    .update({ role: "admin" })
    .eq("user_id", userData.user.id);

  if (roleError) {
    // If update failed, try insert
    await supabase.from("user_roles").insert({ user_id: userData.user.id, role: "admin" });
  }

  return new Response(JSON.stringify({ success: true, userId: userData.user.id }), { status: 200 });
});
