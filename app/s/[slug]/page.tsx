import { createClient } from "@/lib/supabase/server";
import { renderToHtml } from "@/lib/renderer/renderToHtml";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PublishedSitePage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: site } = await supabase
    .from("sites")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (!site) notFound();

  const html = renderToHtml(site.page_data, site.name);

  return (
    <html>
      <body
        dangerouslySetInnerHTML={{ __html: html.replace(/<!DOCTYPE html>[\s\S]*?<body[^>]*>/, "").replace(/<\/body>[\s\S]*$/, "") }}
        style={{ margin: 0 }}
      />
    </html>
  );
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: site } = await supabase
    .from("sites")
    .select("name")
    .eq("slug", slug)
    .single();

  return {
    title: site?.name ?? "DragSite Page",
  };
}
