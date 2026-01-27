import type {NextApiRequest, NextApiResponse} from "next";
import {getInstallationToken} from "../../../lib/githubAuth";

let cachedRepos: any[] | null = null;
let cachedTimestamp = 0;
const CACHE_TTL = 1000 * 60 * 60;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (
        cachedRepos &&
        Date.now() - cachedTimestamp < CACHE_TTL
    ) {
        res.setHeader("Cache-Control", "s-maxage=3600," +
            " stale-while-revalidate" );
        return res.status(200).json(cachedRepos)
    }

    try{
        const token = await getInstallationToken();

        const ghRes = await fetch(
            "https://api.github.com/user/repos?visibility=public&sort=updated",
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/vnd.github+json",
                }
            }
        )
        if (!ghRes.ok){
            throw new Error("GitHub fetch failed")
        }
        const repos = await ghRes.json();

        cachedRepos = repos.maps((r: any) => ({
            name: r.name,
            url: r.html_url,
            description: r.description,
            stars: r.stargazers_count,
        }))
        cachedTimestamp = Date.now();

        res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate")
        res.status(200).json(cachedRepos);
    } catch (err){
        console.error(err)
        res.status(500).json({error: "GitHub fetch failed"})
    }
}