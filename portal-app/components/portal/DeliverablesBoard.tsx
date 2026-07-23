import type { Deliverable } from "@/lib/deliverables";
import { ObjViewer } from "@/components/portal/ObjViewer";
import { Lightbox } from "@/components/portal/Lightbox";

function formatBytes(bytes: unknown): string | null {
  const n = typeof bytes === "number" ? bytes : Number(bytes);
  if (!Number.isFinite(n) || n <= 0) return null;
  const units = ["B", "KB", "MB", "GB", "TB"];
  let value = n;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${value.toFixed(1)} ${units[unit]}`;
}

/** Groups deliverables by project, then renders each type appropriately. */
export function DeliverablesBoard({ items }: { items: Deliverable[] }) {
  if (items.length === 0) {
    return (
      <p className="rounded-lg border border-white/10 p-6 text-sm text-white/40">
        No deliverables yet. They&apos;ll show up here as soon as they&apos;re
        uploaded.
      </p>
    );
  }

  const byProject = new Map<string, { title: string; items: Deliverable[] }>();
  for (const item of items) {
    const existing = byProject.get(item.project_id);
    if (existing) {
      existing.items.push(item);
    } else {
      byProject.set(item.project_id, {
        title: item.project_title,
        items: [item],
      });
    }
  }

  return (
    <div className="space-y-16">
      {Array.from(byProject.entries()).map(([projectId, group]) => {
        const objs = group.items.filter((d) => d.type === "obj");
        const ecws = group.items.filter((d) => d.type === "ecw");
        const tours = group.items.filter((d) => d.type === "tour");
        const media = group.items
          .filter((d) => d.type === "video" || d.type === "image")
          .map((d) => ({
            id: d.id,
            title: d.title,
            url: d.url,
            thumbnail_url: d.thumbnail_url,
            kind: d.type as "video" | "image",
          }));

        return (
          <section key={projectId}>
            <h2 className="text-lg font-medium">{group.title}</h2>

            {objs.length > 0 && (
              <div className="mt-6 space-y-6">
                {objs.map((d) => (
                  <div key={d.id}>
                    <h3 className="mb-2 text-sm font-medium text-white/70">
                      {d.title}
                    </h3>
                    <ObjViewer url={d.url} />
                  </div>
                ))}
              </div>
            )}

            {tours.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-3">
                {tours.map((d) => (
                  <a
                    key={d.id}
                    href={d.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="rounded-lg border border-white/10 px-4 py-3 text-sm hover:border-white/30"
                  >
                    360° tour — {d.title} ↗
                  </a>
                ))}
              </div>
            )}

            {ecws.length > 0 && (
              <div className="mt-6 space-y-3">
                {ecws.map((d) => {
                  const size = formatBytes(d.metadata.file_size_bytes);
                  const area = d.metadata.area_sq_m;
                  const capturedAt = d.metadata.captured_at;
                  return (
                    <div
                      key={d.id}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-white/10 p-4"
                    >
                      <div>
                        <p className="text-sm font-medium">{d.title}</p>
                        <p className="mt-1 text-xs text-white/40">
                          {[
                            area ? `${area} m² covered` : null,
                            capturedAt ? `captured ${capturedAt}` : null,
                            size,
                          ]
                            .filter(Boolean)
                            .join(" · ") ||
                            "GIS orthomosaic (.ecw) — not viewable in-browser"}
                        </p>
                      </div>
                      <a
                        href={d.url}
                        download
                        className="rounded-full border border-white/20 px-4 py-2 text-xs font-medium hover:border-white/50"
                      >
                        Download .ecw
                      </a>
                    </div>
                  );
                })}
              </div>
            )}

            {media.length > 0 && (
              <div className="mt-6">
                <Lightbox items={media} />
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
