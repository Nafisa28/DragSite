import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import TemplatesClient from "./TemplatesClient";
import { ALL_TEMPLATES } from "@/data/templates";

export default async function TemplatesPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/login");

  const { data: templates } = await supabase
    .from("templates")
    .select("*")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  const templateData = templates && templates.length > 0 ? templates : ALL_TEMPLATES;

  return <TemplatesClient user={user} templates={templateData} />;
}
