import { getSupabaseServerClient } from "@/lib/supabase/server";

export type DeliverableType = "obj" | "ecw" | "tour" | "video" | "image";

export type Deliverable = {
  id: string;
  project_id: string;
  project_title: string;
  type: DeliverableType;
  title: string;
  // Resolved, ready-to-use URL: a signed Storage URL for obj/ecw/video/image,
  // or the raw external URL as-is for 'tour'.
  url: string;
  thumbnail_url: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
};

const SIGNED_URL_TTL_SECONDS = 60 * 10; // 10 minutes — long enough to load a page and view/download.

/**
 * Fetches every deliverable the *currently active organization* is allowed
 * to see (client org: its own projects; vendor org: projects it's assigned
 * to) — RLS in supabase/migrations/0002_deliverables.sql enforces the
 * scoping, so this query needs no manual org filter. Resolves Storage
 * paths to short-lived signed URLs; 'tour' rows are already external URLs
 * and pass through unchanged.
 */
export async function getOrgDeliverables(): Promise<Deliverable[]> {
  const supabase = await getSupabaseServerClient();

  const { data, error } = await supabase
    .from("deliverables")
    .select("id, project_id, type, title, file_url, thumbnail_url, metadata, created_at, projects(title)")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Failed to load deliverables: ${error.message}`);
  }

  const rows = data ?? [];

  const resolved = await Promise.all(
    rows.map(async (row): Promise<Deliverable> => {
      const projectTitle =
        (row.projects as unknown as { title: string } | null)?.title ??
        "Untitled project";

      let url = row.file_url;
      let thumbnailUrl = row.thumbnail_url;

      if (row.type !== "tour") {
        const { data: signed } = await supabase.storage
          .from("deliverables")
          .createSignedUrl(row.file_url, SIGNED_URL_TTL_SECONDS);
        if (signed?.signedUrl) url = signed.signedUrl;

        if (row.thumbnail_url) {
          const { data: signedThumb } = await supabase.storage
            .from("deliverables")
            .createSignedUrl(row.thumbnail_url, SIGNED_URL_TTL_SECONDS);
          if (signedThumb?.signedUrl) thumbnailUrl = signedThumb.signedUrl;
        }
      }

      return {
        id: row.id,
        project_id: row.project_id,
        project_title: projectTitle,
        type: row.type as DeliverableType,
        title: row.title,
        url,
        thumbnail_url: thumbnailUrl,
        metadata: (row.metadata as Record<string, unknown>) ?? {},
        created_at: row.created_at,
      };
    }),
  );

  return resolved;
}
