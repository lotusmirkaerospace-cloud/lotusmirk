-- Public marketing-site contact form. Unlike every other table in this
-- schema, this one is written to by anonymous visitors (no Clerk session),
-- so it uses Supabase's own `anon` role rather than the Clerk-JWT
-- `authenticated` role the rest of the app relies on.

create table if not exists contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  message text not null,
  created_at timestamptz not null default now()
);

alter table contact_submissions enable row level security;

-- Anyone can submit the contact form...
create policy "Anyone can submit the contact form"
  on contact_submissions
  for insert
  to anon
  with check (true);

-- ...but only signed-in staff can read submissions back out. There's no
-- "internal LotusMirk staff" organization type in this schema yet — until
-- there is, read this table from the Supabase dashboard/SQL editor rather
-- than exposing it through the app.
