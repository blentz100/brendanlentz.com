create or replace function increment_page_hits(page_slug text)
returns bigint
language plpgsql
as $$
declare
    new_hits bigint;
begin
    insert into page_hits (slug, hits)
    values (page_slug, 1)
    on conflict (slug)
    do update set hits = page_hits.hits + 1
    returning hits into new_hits;

return new_hits;
end;
$$;
