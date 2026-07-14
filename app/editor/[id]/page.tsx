import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import EditorClient from "./EditorClient";
import { PageData } from "@/types/editor";

interface Props {
  params: { id: string };
}

export default async function EditorPage({ params }: Props) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  const { data: site } = await supabase
    .from("sites")
    .select("*")
    .eq("id", params.id)
    .eq("user_id", user.id)
    .single();

  if (!site) {
    redirect("/dashboard");
  }

  let pageData: PageData = { id: site.id, sections: [] };
  if (site.page_data) {
    pageData =
      typeof site.page_data === "string"
        ? JSON.parse(site.page_data)
        : (site.page_data as PageData);
  }

  return (
    <EditorClient
      siteId={site.id}
      initialName={site.name}
      initialStatus={site.status}
      initialSlug={site.slug}
      initialPageData={pageData}
    />
  );
}
