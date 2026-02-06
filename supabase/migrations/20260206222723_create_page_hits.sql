create table page_hits (
                           slug text primary key,
                           hits bigint not null default 0,
                           created_at timestamptz default now(),
                           updated_at timestamptz default now()
);

alter table page_hits enable row level security;
