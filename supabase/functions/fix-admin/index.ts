import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async () => {
  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const email = "rv414511@gmail.com";
  const password = "@Ravi1761#";

  // List users to find existing one
  const { data: users } = await supabaseAdmin.auth.admin.listUsers();
  const existing = users?.users?.find((u) => u.email === email);

  if (existing) {
    // Update password
    const { error } = await supabaseAdmin.auth.admin.updateUserById(existing.id, {
      password,
      email_confirm: true,
    });
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    
    // Ensure admin role
    await supabaseAdmin.from("user_roles").upsert({ user_id: existing.id, role: "admin" }, { onConflict: "user_id,role" });
    await supabaseAdmin.from("profiles").upsert({ id: existing.id, full_name: "Ravi Verma" }, { onConflict: "id" });
    
    return new Response(JSON.stringify({ success: true, action: "updated", userId: existing.id }));
  } else {
    // Create new
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: "Ravi Verma" },
    });
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    
    await supabaseAdmin.from("user_roles").upsert({ user_id: data.user.id, role: "admin" }, { onConflict: "user_id,role" });
    await supabaseAdmin.from("profiles").upsert({ id: data.user.id, full_name: "Ravi Verma" }, { onConflict: "id" });
    
    return new Response(JSON.stringify({ success: true, action: "created", userId: data.user.id }));
  }
});
