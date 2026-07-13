import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import TemplatesClient from "./TemplatesClient";

export default async function TemplatesPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const { data: templates } = await supabase
    .from("templates")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  return <TemplatesClient user={user} templates={templates ?? []} />;
}
