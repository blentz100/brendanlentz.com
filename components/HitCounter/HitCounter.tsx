import useSWR from "swr";
import commaNumber from "comma-number";
import Loading from "../Loading";

export type HitCounterProps = {
  slug: string;
  className?: string;
};

const HitCounter = ({ slug, className }: HitCounterProps) => {
  // start fetching repos from API immediately
  const { data, error } = useSWR(
    slug ? "/api/hits/" : null,
    async (url) => {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug }),
      })

      if (!res.ok){
        throw new Error("Failed to fetch hits");
      }
      return res.json();
    },
    {
      // avoid double (or more) counting views
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  // show spinning loading indicator if data isn't fetched yet
  if (!data) {
    return <Loading boxes={3} width={20} />;
  }

  // fail secretly
  if (error) {
    return null;
  }

  // we have data!
  return (
    <span title={`${commaNumber(data.hits)} ${data.hits === 1 ? "view" : "views"}`} className={className}>
      {commaNumber(data.hits)}
    </span>
  );
};

export default HitCounter;
