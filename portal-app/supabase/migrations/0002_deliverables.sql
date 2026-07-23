-- Deliverables: the artifacts a client/vendor sees in their portal per
-- project — 3D models, aerial imagery, 360 tours, video, and photos.
-- Apply after 0001_init.sql.

create table if not exists deliverables (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects (id) on delete cascade,
  -- Denormalized from projects.organization_id so RLS here doesn't need a
  -- join — matches the pattern in 0001_init.sql.
  organization_id text not null references organizations_meta (organization_id),
  type text not null check (type in ('obj', 'ecw', 'tour', 'video', 'image')),
  title text not null,
  -- For 'obj'/'video'/'image': a Supabase Storage path in the
  -- 'deliverables' bucket (see below), resolved to a signed URL at read
  -- time. For 'ecw': same, but note the file is NOT rendered in-browser —
  -- the portal only offers it as a download, since ECW (aerial-imagery
  -- wavelet compression) has no practical browser decoder; view a
  -- lower-res 'thumbnail_url' instead. For 'tour': an external URL
  -- (Matterport, Kuula, or similar), opened in a new tab.
  file_url text not null,
  thumbnail_url text,
  -- Free-form per-type extras, e.g. {"area_sq_m": 42000, "captured_at":
  -- "2026-06-01", "file_size_bytes": 918000000}.
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table deliverables enable row level security;

-- Client org can read deliverables that belong to its own projects.
create policy "Client org can read own deliverables"
  on deliverables
  for select
  to authenticated
  using (organization_id = (auth.jwt() ->> 'org_id'));

-- Vendor org can read deliverables for projects it's assigned to.
create policy "Vendor org can read assigned project deliverables"
  on deliverables
  for select
  to authenticated
  using (
    exists (
      select 1
      from vendor_assignments va
      where va.project_id = deliverables.project_id
        and va.vendor_organization_id = (auth.jwt() ->> 'org_id')
    )
  );

-- Only the client org's admins can add/edit/remove deliverables for their
-- own projects (uploads are expected to go through an internal/admin flow,
-- not directly from a vendor or a public form).
create policy "Client org admins can manage own deliverables"
  on deliverables
  for all
  to authenticated
  using (
    organization_id = (auth.jwt() ->> 'org_id')
    and (auth.jwt() ->> 'org_role') = 'org:admin'
  )
  with check (
    organization_id = (auth.jwt() ->> 'org_id')
    and (auth.jwt() ->> 'org_role') = 'org:admin'
  );

-- Storage bucket for the actual files. Kept private (not public) — the
-- portal reads files via short-lived signed URLs generated server-side,
-- never a public bucket URL.
insert into storage.buckets (id, name, public)
values ('deliverables', 'deliverables', false)
on conflict (id) do nothing;

-- Objects are stored under a path convention of
-- `${organization_id}/${project_id}/filename`, so storage RLS can enforce
-- both the client-org scoping and the vendor-assignment scoping without a
-- join back to `deliverables` itself.
create policy "Client org can read own deliverable files"
  on storage.objects
  for select
  to authenticated
  using (
    bucket_id = 'deliverables'
    and (storage.foldername(name))[1] = (auth.jwt() ->> 'org_id')
  );

create policy "Vendor org can read assigned deliverable files"
  on storage.objects
  for select
  to authenticated
  using (
    bucket_id = 'deliverables'
    and exists (
      select 1
      from vendor_assignments va
      where va.project_id = (storage.foldername(name))[2]::uuid
        and va.vendor_organization_id = (auth.jwt() ->> 'org_id')
    )
  );

create policy "Client org admins can upload own deliverable files"
  on storage.objects
  for insert
  to authenticated
  with check (
    bucket_id = 'deliverables'
    and (storage.foldername(name))[1] = (auth.jwt() ->> 'org_id')
    and (auth.jwt() ->> 'org_role') = 'org:admin'
  );
