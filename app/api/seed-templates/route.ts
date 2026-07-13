import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { ALL_TEMPLATES } from "@/data/templates";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const secret = url.searchParams.get("secret");
  const expectedSecret = process.env.SEED_TEMPLATES_KEY;

  if (!expectedSecret || secret !== expectedSecret) {
    return NextResponse.json(
      { error: "Unauthorized. Set SEED_TEMPLATES_KEY and provide ?secret=<key>." },
      { status: 401 }
    );
  }

  const supabase = await createClient();

  const { data: existingTemplates, error: fetchError } = await supabase
    .from("templates")
    .select("id")
    .limit(1);

  if (fetchError) {
    return NextResponse.json(
      { error: "Failed to check existing templates.", details: fetchError.message },
      { status: 500 }
    );
  }

  if (existingTemplates && existingTemplates.length > 0) {
    return NextResponse.json({ message: "Templates already seeded." });
  }

  const insertPayload = ALL_TEMPLATES.map((template) => ({
    name: template.name,
    category: template.category,
    description: template.description,
    page_data: template.page_data,
    sort_order: template.sort_order ?? 0,
  }));

  const { data: insertedTemplates, error: insertError } = await supabase
    .from("templates")
    .insert(insertPayload)
    .select("id,name,category,sort_order");

  if (insertError) {
    return NextResponse.json(
      { error: "Failed to insert templates.", details: insertError.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    message: "Templates seeded successfully.",
    count: insertedTemplates?.length ?? 0,
    templates: insertedTemplates ?? [],
  });
}
