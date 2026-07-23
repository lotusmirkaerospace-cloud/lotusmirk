-- Initial schema for the LotusMirk client/vendor portal.
-- Apply with the Supabase connector's migration tool, or `supabase db push`
-- once the project's Third-Party Auth (Clerk) integration is configured.
--
-- Row-level security here trusts claims from the Clerk session token:
--   auth.jwt()->>'org_id'    -- active Clerk organization id
--   auth.jwt()->>'org_role'  -- 'org:admin' | 'org:member' | ...
-- These are the standard Clerk-issued claims; see
-- https://supabase.com/docs/guides/auth/third-party/clerk

create table if not exists organizations_meta (
  organization_id text primary key,      -- Clerk organization id (org_xxx)
  org_type text not null check (org_type in ('client', 'vendor')),
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  organization_id text not null references organizations_meta (organization_id),
  title text not null,
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table if not exists vendor_assignments (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects (id),
  vendor_organization_id text not null references organizations_meta (organization_id),
  assigned_at timestamptz not null default now()
);

alter table organizations_meta enable row level security;
alter table projects enable row level security;
alter table vendor_assignments enable row level security;

-- Members can read their own organization's row.
create policy "Org members can read their own org"
  on organizations_meta
  for select
  to authenticated
  using (organization_id = (auth.jwt() ->> 'org_id'));

-- Client orgs see only their own projects.
create policy "Client org can read own projects"
  on projects
  for select
  to authenticated
  using (organization_id = (auth.jwt() ->> 'org_id'));

-- Only org admins can create or edit projects for their own org.
create policy "Org admins can manage own projects"
  on projects
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

-- A vendor org can see only the assignment rows that name it.
create policy "Vendor org can read own assignments"
  on vendor_assignments
  for select
  to authenticated
  using (vendor_organization_id = (auth.jwt() ->> 'org_id'));
