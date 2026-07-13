import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  // Fetch user's sites
  const { data: sites } = await supabase
    .from("sites")
    .select("*")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });

  // Fetch profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <DashboardClient
      user={user}
      profile={profile}
      initialSites={sites ?? []}
    />
  );
}
